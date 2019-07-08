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
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {getBookableRooms, getRoomAvailability} from "../../actions/room-actions";
import queryString from 'query-string'
import {daysBetweenDates} from "../../utils/helpers";

class AvailableRooms extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			date: null,
			slot: null,
		}
	}
	
	componentDidMount() {
		let {summit, getBookableRooms} = this.props
		this.checkQueryParams()
		if(!summit.loading && summit.loaded) {
			// Getting all bookable rooms on mount, would be better to get just this ID.
			getBookableRooms()
		}
	}

	checkQueryParams(){
		let {summit, getBookableRooms} = this.props

		const {location} = this.props
		const {search} = location
		if(search) {
		let queryParams = queryString.parse(search);
			this.setState({...queryParams})
		}else{
			this.setState({'date': summit.currentSummit.start_date})
		}   
	}

	componentDidUpdate(prevProps, prevState) {
		let {rooms, getRoomAvailability, match, roomAvailability, loading, location, history} = this.props
		let singleRoom = null

		// If there are rooms
		if(rooms.data !== null){
			
			// Find this room
			singleRoom = rooms.data.find(room => room.id == match.params.id)
			
			// If this room was found
			if(singleRoom !== null){
				
				// Load availability if not loaded yet
				if(this.state.date && roomAvailability.data == null  && !loading){
					getRoomAvailability(singleRoom.id, this.state.date)	
				}
				
				if(prevState.date !== this.state.date){
					getRoomAvailability(singleRoom.id, this.state.date)
				}
			}
		}
	}
	
	changeDate(date){
		this.setState({date: date})
	}

	render(){
		const {match, history, rooms, roomAvailability, summit} = this.props

		let {start_date, end_date, time_zone} = summit.currentSummit
		let summitDays = daysBetweenDates(start_date, end_date, time_zone.name)

		let singleRoom
		
		// Have rooms been loaded
		if(rooms.data !== null){
			singleRoom = rooms.data.find(room => room.id == match.params.id)
		}else{
			return null
		}
		
		//Is there a room that matches the param ID?
		if(!singleRoom){
			return <div>Room Not Found</div>
		}

		let amenities = singleRoom.attributes.map(a => a.value).join(', ')
		
		return (
			<div>
				<MeetingRoomCard
					image={singleRoom.image}
					name={singleRoom.name}
					capacity={singleRoom.capacity}
					floor={singleRoom.floor_id}
					amenities={amenities}
				/>
				
				{this.state.slot ?  
					<MeetingRoomBook days={summitDays} date={this.state.date} room={singleRoom} slot={this.state.slot} /> :
					<MeetingRoomAvailability changeDate={(date)=>{this.changeDate(date)}} days={summitDays}  date={this.state.date} availability={roomAvailability} onSelect={(availability)=>{this.setState({slot: availability})}} />
				}
			</div>
			
		);
	}
}

const mapStateToProps = ({ summitReducer, roomsReducer, roomAvailabilityReducer, baseState }) => ({
	summit: summitReducer,
	rooms: roomsReducer.rooms,
	roomAvailability: roomAvailabilityReducer.availability,
	loading: roomAvailabilityReducer.loading
})

export default connect(
	mapStateToProps,
	{getBookableRooms, getRoomAvailability}
)(AvailableRooms)
