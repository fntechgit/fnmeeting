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

class AvailableRooms extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			
		}
	}

	render(){
		const {match, history} = this.props
		
		return (
			<div>
				<MeetingRoomCard
					image={'https://via.placeholder.com/150'}
					name={'Sky Lounge'}
					capacity={'22'}
					floor={'1'}
					amenities={'Teleconference, Meeting, Phone'}
				/>
				<Switch>
					<Route exact path={`${match.path}`} component={()=><MeetingRoomAvailability availability={['1', '2', '3', '4', '5', '6']} onSelect={(availability)=>{history.push(`${match.url}/${availability}`)}} />} />
					<Route path={`${match.path}/:id`} component={MeetingRoomBook} />
					<Route render={props => (<Redirect to={`${match.path}`}/>)}/>
				</Switch>
			</div>
			
		);
	}
}

export default AvailableRooms;
