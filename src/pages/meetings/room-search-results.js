/**
 * Copyright 2018 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import React from 'react';
import MeetingRoomCard from '../../components/meeting-room-card'
import RoomSearch from "../../components/room-search";
import FilterModal from '../../components/modal'
import {connect} from "react-redux";
import T from 'i18n-react';
import {getBookableRooms} from "../../actions/room-actions";
import { Pagination } from 'react-bootstrap';


class RoomSearchResults extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showFilterModal: false, // controls the modal
		}

		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		let {currentSummit, getBookableRooms, date, size, ammenities} = this.props;
		// Search
		if(currentSummit !== null) {
			getBookableRooms(date, size, ammenities)
		}
	}

	componentDidUpdate(newProps) {
		let {getBookableRooms, date, size, ammenities, rooms} = this.props;
		let {per_page} = rooms;
		if (date !== newProps.date || size !== newProps.size  || ammenities !== newProps.ammenities) {
			getBookableRooms(date, size, ammenities, 1, per_page);
			this.toggleFilterModal(false);
		}
	}

	toggleFilterModal(value){
		this.setState({'showFilterModal': value})
	}

	handlePageChange(page) {
		let {date, size, ammenities, rooms} = this.props;
		let {per_page} = rooms;
		this.props.getBookableRooms(date, size, ammenities, page, per_page);
	}

	clearFilters = (ev) => {
		const {date, size} = this.props;
		ev.preventDefault();
		this.props.onSubmit({date, size, ammenities: []});
	}

	render(){
		const {onSelect, date, size, rooms, availableDays, currentSummit, ammenities, loading, nowUtc} = this.props;
		const {data, current_page, last_page} = rooms;

		return (
			<div>
				<h2>{T.translate("bookable_room.available_rooms")}</h2>
				<div id="my-meetings-menu" onClick={()=>{this.toggleFilterModal(true)}} className="menu-item">
					{T.translate("bookable_room.filter_rooms")}
					<i className="fa-filter fa"></i>
				</div>

				{data && data.length > 0 &&
					<>
						{data.map((room, i) =>
							<MeetingRoomCard
								key={i}
								nowUtc={nowUtc}
								time_zone={currentSummit.time_zone.name}
								room={room}
								action={onSelect}
								actionLabel={T.translate("bookable_room.see_availability")}
							/>
						)}
						<Pagination
							bsSize="medium"
							prev
							next
							first
							last
							ellipsis
							boundaryLinks
							maxButtons={10}
							items={last_page}
							activePage={current_page}
							onSelect={this.handlePageChange}
						/>
					</>
				}

				{data && data.length === 0 && !loading &&
					<div>
						{T.translate("book_meeting.no_results")}
						<a href="" onClick={this.clearFilters} >clear all optional filters</a>
					</div>
				}

				<FilterModal show={this.state.showFilterModal} onClose={()=>{this.toggleFilterModal(false)}} title={'Filter Available Rooms'}>
					<div style={{padding: '1em'}}>
						<RoomSearch
							availableDays={availableDays}
							date={date}
							size={size}
							ammenities={ammenities}
							allowed_attributes={currentSummit.meeting_booking_room_allowed_attributes}
							onSubmit={(values)=>this.props.onSubmit(values)}
						/>
					</div>
				</FilterModal>
			</div>

		);
	}
}

const mapStateToProps = ({ summitReducer, roomsReducer, loggedUserState, baseState, clockState }) => ({
	currentSummit: summitReducer.currentSummit,
	rooms: roomsReducer.rooms,
	member: loggedUserState.member,
	loading : baseState.loading,
	nowUtc: clockState.nowUtc
})

export default connect(
	mapStateToProps,
	{getBookableRooms}
)(RoomSearchResults)
