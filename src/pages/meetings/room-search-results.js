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
import FilterModal from '../../components/modal'
import AvailableRoomsFilter from '../../components/room-search'

class RoomSearchResults extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showFilterModal: false,
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
		const {onSelect, date, size} = this.props
		
		return (
			<div>
				<h2>Available Rooms</h2>
				<div id="my-meetings-menu" onClick={()=>{this.toggleFilterModal(true)}} className="menu-item">Filter<i className="fa-filter fa"></i></div>
				<MeetingRoomCard
					room={'1'}
					image={'https://via.placeholder.com/150'}
					name={'Sky Lounge'}
					capacity={'22'}
					floor={'1'}
					amenities={'Teleconference, Meeting, Phone'}
					action={onSelect}
					actionLabel={'See Availability'}
				/>
				<MeetingRoomCard
					room={'2'}
					image={'https://via.placeholder.com/150'}
					name={'Try Lounge'}
					capacity={'232'}
					floor={'3'}
					amenities={'Teleconference, Meeting, Phone, Cameras, Video, White Board, Pizza, Door, Email'}
					action={onSelect}
					actionLabel={'See Availability'}
				/>
				<MeetingRoomCard
					room={'3'}
					image={'https://via.placeholder.com/150'}
					name={'My Lounge'}
					capacity={'44'}
					floor={'2'}
					amenities={'Teleconference, Meeting, Phone'}
					action={onSelect}
					actionLabel={'See Availability'}
				/>
				
				<FilterModal show={this.state.showFilterModal} onClose={()=>{this.toggleFilterModal(false)}} title={'Filter Available Rooms'}>
					<div style={{padding: '1em'}}><AvailableRoomsFilter date={date} size={size} /></div>
				</FilterModal>
			</div>
			
		);
	}
}

export default RoomSearchResults;
