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
import MeetingRoomAvailability from '../../components/meeting-room-availability'
import MeetingRoomBook from './room-book'
import {connect} from "react-redux";
import {getBookableRoom, getRoomAvailability} from "../../actions/room-actions";
var QueryString = require('querystring')
import T from "i18n-react";

class AvailableRooms extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			date: null,
			slot: null,
		}
	}

	componentDidMount() {
		let {summit, match} = this.props
		this.checkQueryParams()
		if(!summit.loading && summit.loaded) {
			this.props.getBookableRoom(match.params.id)
		}
	}

	checkQueryParams(){
		const {summit, location} = this.props
		const {search} = location

		if (search) {
			const queryParams = QueryString.parse(search.slice(1));
			this.setState({...queryParams})
		} else {
			this.setState({'date': summit.currentSummit.start_date})
		}
	}

	getSingleRoomAvailability(prevState){
		const {room, summit, getRoomAvailability, match, roomAvailability, loading } = this.props

		if(room && room.id === parseInt(match.params.id)){
			// Load availability if not loaded yet
			if(this.state.date && roomAvailability.data == null  && !loading){
				getRoomAvailability(room.id, this.state.date)
			}

			if(prevState.date !== this.state.date){
				getRoomAvailability(room.id, this.state.date)
			}
		} else {
			if(!summit.loading && summit.loaded && !loading) {
				this.props.getBookableRoom(match.params.id)
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.getSingleRoomAvailability(prevState)
	}

	changeDate(date){
		const {match, history} = this.props
		this.setState({date: date})
		history.push({search: `?date=${date}`})
	}

	clearSlot(){
		this.setState({slot: null})
	}

	render(){
		const {history, room, roomAvailability, summit, nowUtc, loading} = this.props;

		// Have room been loaded
		if(loading) return null;
		if(!room && !loading) return <div>{T.translate("book_meeting.room_not_found")}</div>

		return (
			<div>
				{this.state.slot ?
					<div className={'back_to_search'} onClick={()=>this.clearSlot()} ><i className='fa fa-arrow-left'/> {T.translate("book_meeting.back")}</div> :
					<div className={'back_to_search'} onClick={history.goBack} ><i className='fa fa-arrow-left'/> {T.translate("book_meeting.back")}</div>

				}

				<MeetingRoomCard
					room={room}
					nowUtc={nowUtc}
					time_zone={summit.currentSummit.time_zone_id}
				/>

				{this.state.slot &&
				<MeetingRoomBook
					cancel={() => this.clearSlot()}
					date={this.state.date}
					room={room}
					slot={this.state.slot}
					history={history}
				/>
				}
				{!this.state.slot &&
					<MeetingRoomAvailability
						changeDate={(date)=>{this.changeDate(date)}}
						availableDays={summit.currentSummit.bookingDays}
						time_zone={summit.currentSummit.time_zone_id}
						date={this.state.date}
						availability={roomAvailability}
						onSelect={(availability)=>{this.setState({slot: availability})}}
					/>
				}
			</div>

		);
	}
}

const mapStateToProps = ({ summitReducer, roomAvailabilityReducer, clockState }) => ({
	summit: summitReducer,
	room: roomAvailabilityReducer.room,
	roomAvailability: roomAvailabilityReducer.availability,
	loading: roomAvailabilityReducer.loading,
	nowUtc: clockState.nowUtc
})

export default connect(
	mapStateToProps,
	{getBookableRoom, getRoomAvailability}
)(AvailableRooms)
