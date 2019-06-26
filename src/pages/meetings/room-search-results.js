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
import AvailableRoomsFilter from '../../components/room-search'
import {connect} from "react-redux";
import {getBookableRooms} from "../../actions/room-actions";


class RoomSearchResults extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showFilterModal: false,
		}
	}

	componentDidMount() {
		let {currentSummit, getBookableRooms, date, size} = this.props
		if(currentSummit !== null) {
			getBookableRooms(date, size)
		}
	}
	
	componentWillReceiveProps(newProps) {
		let {currentSummit, getBookableRooms, date, size} = this.props
		if (currentSummit !== null && currentSummit.id != newProps.currentSummit.id) {
			getBookableRooms(date, size)
		}
	}
	
	toggleFilterModal(value){
		if(value){
			this.setState({'showFilterModal': value})	
		}else{
			this.setState({'showFilterModal': !this.state.showFilterModal})
		}
	}
	
	

	render(){
		const {onSelect, date, size, rooms, days} = this.props
		
		return (
			<div>
				<h2>Available Rooms</h2>
				<div id="my-meetings-menu" onClick={()=>{this.toggleFilterModal(true)}} className="menu-item">Filter<i className="fa-filter fa"></i></div>
				
				{rooms.data ? rooms.data.map((room, i) => {
				let amenities = room.attributes.map(a => a.value).join(', ')			
				return <MeetingRoomCard
					key={i}
					room={room.id}
					image={'https://via.placeholder.com/150'}
					name={room.name}
					capacity={room.capacity}
					floor={room.floor_id}
					amenities={amenities}
					action={onSelect}
					actionLabel={'See Availability'}
				/>}) : null}
				
				<FilterModal show={this.state.showFilterModal} onClose={()=>{this.toggleFilterModal(false)}} title={'Filter Available Rooms'}>
					<div style={{padding: '1em'}}><RoomSearch days={this.props.days} onSubmit={(values)=>{this.props.onSubmit(values)}}/></div>
				</FilterModal>
			</div>
			
		);
	}
}

const mapStateToProps = ({ summitReducer, roomsReducer, loggedUserState }) => ({
	currentSummit: summitReducer.currentSummit,
	rooms: roomsReducer.rooms,
	member: loggedUserState.member
})

export default connect(
	mapStateToProps,
	{getBookableRooms}
)(RoomSearchResults)