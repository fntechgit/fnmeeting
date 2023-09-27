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
import Swal from "sweetalert2";


const MyReservationsPage = ({reservations, summit, nowUtc, loadedRes, cancelReservation}) => {
	const paidReservations = reservations?.data?.filter(reservation => (reservation.status === 'Paid')) || [];

	const handleCancelReservation = (reservation, date) => {
		Swal.fire({
			title: T.translate("general.are_you_sure"),
			text: `${T.translate("my_reservations.cancel_reservation")} ${reservation.room.name} on ${date}`,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: T.translate("general.yes_cancel")
		}).then(function(result){
			if (result.value) {
				cancelReservation(reservation.id);
			}
		});
	}

	// If there are no paid reservations, show no reservation message
	if (!paidReservations.length > 0 && loadedRes) {
		return <div>{T.translate("my_reservations.no_reservations")}</div>
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
							nowUtc={nowUtc}
							onCancel={handleCancelReservation}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default MyReservationsPage;
