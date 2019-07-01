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
		
		// if(reservations.data.length === 0 ){
		// 	return <small>No Reservations</small>
		// }

		return <div>
			{reservations.data && reservations.data.length > 0 ? 
				reservations.data.map((reservation, i) => {
					const {room} = reservation;
					let amenities = room.attributes.map(a => a.value).join(', ')
					
					return <div>
							<MeetingRoomCard
							key={i}
							room={room.id}
							image={'https://via.placeholder.com/150'}
							name={room.name}
							capacity={room.capacity}
							floor={room.floor_id}
							amenities={amenities}
							start_time={reservation.start_datetime}
							end_time={reservation.end_datetime}
							status={reservation.status}
							/>
							</div>
				}) : <div>No Rooms Found...</div>}
			</div>
		}
		
}

export default MyMeetingsPage;
