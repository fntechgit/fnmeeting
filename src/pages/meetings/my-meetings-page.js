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

class MyMeetingsPage extends React.Component {

	constructor (props) {
		super(props);
	}
	
	render(){
		const {reservations} = this.props
		
		if(reservations.data.length === 0 ){
			return <small>No Reservations</small>
		}
		
		return <div> 
		{reservations.map(
			r => <MeetingRoomCard
			image={'https://via.placeholder.com/150'}
			name={'Sky Lounge'}
			capacity={'22'}
			floor={'1'}
			amenities={'Teleconference, Meeting, Phone'}
			actionLabel={'Cancel Meeting'}
			action={()=>{alert('are you sure?')}}
		/>)}</div>
	}
}

export default MyMeetingsPage;
