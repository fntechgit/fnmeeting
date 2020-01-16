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
import React from 'react'
import RoomSearch from '../components/room-search'
import RoomSearchResults from '../pages/meetings/room-search-results'
import {connect} from "react-redux"
import {getBookableRooms} from "../actions/room-actions"
var QueryString = require('querystring')
import { getAvailableDates, getSummitDates } from '../utils/helpers'

class RoomSearchPage extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			date: false,
			size: false,
			ammenities: []
		}
	}

	componentDidMount() {
		// Check URL params when the page mounts
		this.checkQueryParams()
	}

	// Check on page load so that we can pass around URLs to search results
	checkQueryParams(){
		const {location} = this.props
		const {search} = location
		if(search) {
			let queryParams = new URLSearchParams(search);

			if (queryParams.get('date') && queryParams.get('size')) {
				this.setState({date: queryParams.get('date'), size: queryParams.get('size')})
			}

			if(queryParams.get('ammenities')){
				this.setState({ammenities: queryParams.get('ammenities').split(",")})
			}
		}
	}

	setQueryParams(values){
		const {history} = this.props;

		// Adds search params to react state
		this.setState(values, () => {
			// Check for arrays in values, update to csv rather than individual params for URL
			Object.keys(values).forEach((key)=>{
				if(Array.isArray(values[key])){
					values[key] = values[key].join();
				}
			})

			// Adds all search params from state to the URL
			history.replace({
				search: QueryString.stringify(values)
			})
		})
	}

	render(){
		const {currentSummit, history, match} = this.props;
		let availableDays = getAvailableDates(currentSummit);
		let summitDays = getSummitDates(currentSummit);


		// If date and size are chosen, show results
		if(this.state.date && this.state.size ) {
			//
			return (
				<RoomSearchResults
					summitDays={summitDays}
					availableDays={availableDays}
					onSubmit={(values)=>{this.setQueryParams(values)}}
					date={this.state.date}
					size={this.state.size}
					ammenities={this.state.ammenities}
					allowed_attributes={currentSummit.meeting_booking_room_allowed_attributes}
					onSelect={(room)=>{history.push(`${match.url}/${room}?date=${this.state.date}`)}}
				/>
			);
		}
		// RoomsSearch component is the initial search form
		return (
			<RoomSearch
				summitDays={summitDays}
				availableDays={availableDays}
				onSubmit={(values)=>{this.setQueryParams(values)}}
				ammenities={this.state.ammenities}
				allowed_attributes={currentSummit.meeting_booking_room_allowed_attributes}
			/>
		);
	}
}

const mapStateToProps = ({ summitReducer, reservationsReducer, loggedUserState }) => ({
	currentSummit: summitReducer.currentSummit,
	member: loggedUserState.member
})

export default connect(
	mapStateToProps,
	{getBookableRooms}
)(RoomSearchPage)
