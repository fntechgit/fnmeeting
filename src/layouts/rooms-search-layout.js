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
import moment from 'moment-timezone'

class RoomSearchPage extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			date: false,
			size: false,
		}
	}

	daysBetweenDates(startDate, endDate, timezone) {
		let startDay = moment(startDate * 1000).tz(timezone)
		let endDay = moment(endDate * 1000).tz(timezone)
		let dates = [startDay.clone().unix()]
		
		while(startDay.add(1, 'days').diff(endDay) < 0) {
			dates.push(startDay.clone().unix())
		}
		return dates
	}

	componentDidMount() {
		let {currentSummit, getBookableRooms, history} = this.props
		this.checkQueryParams()
	}
	
	checkQueryParams(){
		const {location} = this.props
		const {search} = location
		if(search) {
			let queryParams = new URLSearchParams(search);

			if (queryParams.get('date') && queryParams.get('size')) {
				this.setState({date: queryParams.get('date'), size: queryParams.get('size')})
			}
		}
	}
	
	setQueryParams(values){
		const {history} = this.props;

		history.push({
			search: QueryString.stringify(values)
		})

		this.setState(values)
	}

	render(){
		const {currentSummit, history} = this.props;
		let {start_date, end_date, time_zone} = currentSummit
		let summitDays = this.daysBetweenDates(start_date, end_date, time_zone.name)
		
		if(this.state.date && this.state.size ) {
			return (
				<RoomSearchResults days={summitDays} date={this.state.date} size={this.state.size} onSelect={(room)=>{history.push(`/app/rooms/${room}?date=${this.state.date}`)}} />
			);
		}
		return <RoomSearch days={summitDays} onSubmit={(values)=>{this.setQueryParams(values)}}/>
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