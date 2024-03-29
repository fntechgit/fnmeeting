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
import React, {useState, useEffect} from 'react';
import Modal from "../../components/modal";
import {connect} from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {createReservation, payReservation, clearReservation} from "../../actions/room-actions";
import {getFormatedTime, getFormatedDate} from "../../utils/helpers";
import T from 'i18n-react';
import PaymentForm from "../../components/payment-form";
import Swal from "sweetalert2";


const RoomBook = ({date, time, slot, room, payReservation, member, currentSummit, history, newReservation, clearReservation, createReservation}) => {
	const [showModal, setShowModal] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const {time_zone_id, bookingDays} = currentSummit;

	useEffect(() => {
		return () => {
			clearReservation();
		}
	}, [])

	const toggleModal = (value) => {
		setShowModal(value)
	}

	const bookingLegend = () => {
		const supportEmail = window.SUPPORT_EMAIL || currentSummit.support_email;
		return (
			<p dangerouslySetInnerHTML={{__html:
					T.translate(
						room.time_slot_cost > 0 ?
							"book_meeting.must_cancel_within_non_free" :
							"book_meeting.must_cancel_within_free",
						{
							cancellation_period_in_hours: window.CANCELLATION_PERIOD_IN_HOURS,
							support_email: supportEmail,
							mail_subject: `${currentSummit.name} - Have an inquired related to ${room.name}`
						}
					)
				}}></p>
		);
	}

	const clickBook = () => {
		if (!newReservation.loaded && !newReservation.loading) {
			createReservation(room.id, slot.start_date, slot.end_date, room.currency, room.time_slot_cost)
				.then(payload => {
					if (!payload.err) {
						const {response} = payload;
						if (response.status === 'Paid') {
							Swal.fire({
								title: T.translate("book_meeting.reservation_created_title"),
								text: T.translate("book_meeting.free_reservation_created_subtitle"),
								type: "success",
							}).then(function(result){
								if (result.value) {
									history.push(`/a/${currentSummit.id}/my-meetings`)
								}
							});
						} else {
							toggleModal(true)
						}
					}
				}).catch(e => {})
		}
	}

	let publicKey = null;
	for (let profile of currentSummit.payment_profiles) {
		if (profile.application_type === 'BookableRooms') {
			publicKey = profile.test_mode_enabled ? profile.test_publishable_key : profile.live_publishable_key;
			break;
		}
	}

	const [stripePromise, setStripePromise] = useState(() => loadStripe(publicKey))
	// Show confirmation if payment has been made
	if (confirmed) {
		return <div>
			<h3>{T.translate("book_meeting.confirmation")}</h3>
			<h4>{T.translate("book_meeting.you_have_booked")} {room.name}</h4>
			<h3>{date} - {time}</h3>
			{ bookingLegend() }
		</div>
	}

	// Localize cost to currency passed by API
	const cost = new Intl.NumberFormat(Intl.getCanonicalLocales(), { style: 'currency', currency: room.currency }).format(room.time_slot_cost)
	const {summitDayNumber} = bookingDays.find(bd => bd.epoch == date) || {};
	const summitDayStr = summitDayNumber ? `${T.translate("book_meeting.day", {day : summitDayNumber})}, ` : '';


	return (
		<div>
			<h3>{room.name}<div className={'pull-right'}>{cost}</div></h3>
			<h4>{summitDayStr}{getFormatedDate(date, time_zone_id)}, {getFormatedTime(slot.start_date, time_zone_id)} - {getFormatedTime(slot.end_date, time_zone_id)}</h4>
			<br  />
			{ bookingLegend() }
			{/* Book this room button */}
			<div onClick={clickBook} className={'btn btn-warning btn-lg btn-block'}>
				{T.translate("book_meeting.book_this_room")}
			</div>


			<Modal show={showModal} onClose={()=> toggleModal(false)} title={''}>
				{newReservation.loaded &&
					<div>
						<div className={'book-meeting-profile-pic'}>
							<img src={member.pic} />
							<div className={'book-meeting-name'}>{member.first_name} {member.last_name}</div>
						</div>
						<Elements stripe={stripePromise}>
							<PaymentForm
								price={room.time_slot_cost}
								currency={room.currency}
								payBooking={payReservation}
							/>
						</Elements>
					</div>
				}
			</Modal>

		</div>
	);
}

const mapStateToProps = ({ summitReducer, newReservationReducer, loggedUserState }) => ({
	member: loggedUserState.member,
	currentSummit: summitReducer.currentSummit,
	newReservation: newReservationReducer,
})

export default connect(
	mapStateToProps,
	{
		createReservation,
		payReservation,
		clearReservation
	}
)(RoomBook);

