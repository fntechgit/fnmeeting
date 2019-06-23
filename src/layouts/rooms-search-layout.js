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
import RoomSearch from '../components/room-search'
import RoomSearchResults from '../pages/meetings/room-search-results'
var QueryString = require('querystring')


class RoomSearchPage extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			date: false,
			size: false,
		}
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

	componentDidMount() {
		this.checkQueryParams()
	}

	render(){
		const {match, history} = this.props;

		if(this.state.date && this.state.size) {
			return (
				<RoomSearchResults date={this.state.date} size={this.state.size} onSelect={(room)=>{history.push(`/app/rooms/${room}`)}} />
			);
		}
		return <RoomSearch onSubmit={(values)=>{this.setQueryParams(values)}}/>
	}
}

export default RoomSearchPage;
