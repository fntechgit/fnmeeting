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
import T from 'i18n-react'

class MyReservationsPage extends React.Component {

	constructor (props) {
		super(props);
	}

	render() {
		const {reservations, summit} = this.props

		const noReservations = <div>{T.translate("my_reservations.no_reservations")}</div>

		// If there are no reservations
		if (!reservations.data || reservations.data.length < 1) {
			return noReservations
		}

		// Filter out  only Paid Reservations
		let paidReservations = reservations.data.filter(reservation => (reservation.status === 'Paid'));

		// If there are no paid reservations, show no reservation message
		if (paidReservations.length < 1) {
			return noReservations
		}

		// Render all reservations
		return (
			<div>
				{paidReservations.map(reservation => {
					const {room} = reservation;
					// Only show paid reservations (payed)
					return (
						<div key={`res_${reservation.id}`}>
							<MeetingRoomCard
								time_zone={summit.time_zone.name}
								room={room}
								reservation={reservation}
							/>
						</div>
					);
				})}
			</div>
		);
	}
}

export default MyReservationsPage;
