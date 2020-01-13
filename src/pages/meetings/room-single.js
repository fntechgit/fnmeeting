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
import {getSummitDates} from "../../utils/helpers";
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
		let {summit, getBookableRooms} = this.props
		this.checkQueryParams()
		if(!summit.loading && summit.loaded) {
			// Getting all bookable rooms on mount, would be better to get just this ID.
			getBookableRooms()
		}
	}

	checkQueryParams(){
		const {summit, location} = this.props
		const {search} = location

		if(search) {
		let queryParams = queryString.parse(search);
			this.setState({...queryParams})
		}else{
			this.setState({'date': summit.currentSummit.start_date})
		}
	}

	getSingleRoomAvailability(prevState){
		const {rooms, getRoomAvailability, match, roomAvailability, loading } = this.props
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
		const {match, history, rooms, roomAvailability, summit} = this.props;
		let summitDays = getSummitDates(summit.currentSummit);

		let singleRoom;

		// Have rooms been loaded
		if(rooms.data !== null){
			singleRoom = rooms.data.find(room => room.id == match.params.id)
		}else{
			return null
		}

		//Is there a room that matches the param ID?
		if(!singleRoom){
			return <div>{T.translate("book_meeting.room_not_found")}</div>
		}

		return (
			<div>
				{this.state.slot ?
					<div className={'back_to_search'} onClick={()=>this.clearSlot()} ><i className='fa fa-arrow-left'/> {T.translate("book_meeting.back")}</div> :
					<div className={'back_to_search'} onClick={history.goBack} ><i className='fa fa-arrow-left'/> {T.translate("book_meeting.back")}</div>

				}

				<MeetingRoomCard room={singleRoom} />

				{this.state.slot &&
				<MeetingRoomBook
					cancel={() => this.clearSlot()}
					days={summitDays}
					time_zone={summit.currentSummit.time_zone_id}
					date={this.state.date}
					room={singleRoom}
					slot={this.state.slot}
				/>
				}
				{!this.state.slot &&
					<MeetingRoomAvailability
						changeDate={(date)=>{this.changeDate(date)}}
						days={summitDays}
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
