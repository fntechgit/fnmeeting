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
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../../components/payment-form';
import Modal from "../../components/modal";
import {connect} from "react-redux";
import {createReservation, payReservation} from "../../actions/room-actions";
import {getDayNumberFromDate, getFormatedTime, getFormatedDate} from "../../utils/helpers";
import T from 'i18n-react';

class RoomBook extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showModal: false,
			confirmed: false,
			apiKeyToken: null,
		}
	}

	toggleModal(value){
		if(value){
			this.setState({'showModal': value})
		}else{
			this.setState({'showModal': !this.state.showModal})
		}
	}
	
	componentDidUpdate(){
		const {slot, room} = this.props

		if(this.state.showModal && !this.props.newReservation.loaded && !this.props.newReservation.loading && this.props.newReservation.errors.length === undefined){
			this.props.createReservation(room.id, slot.start_date, slot.end_date, room.currency, room.time_slot_cost)
		}
	}

	render(){
		
		const {days, date, time, slot, room, payReservation, member} = this.props
		
		// Show confirmation if payment has been made
		if(this.state.confirmed){
			return <div>
				<h3>{T.translate("book_meeting.confirmation")}</h3>
				<h4>{T.translate("book_meeting.you_have_booked")} {room.name}</h4>
				<h3>{date} - {time}</h3>
				<p>{T.translate("book_meeting.must_cancel_within")}</p>
			</div>
		}

		// Localize cost to currency passed by API
		let cost = new Intl.NumberFormat(Intl.getCanonicalLocales(), { style: 'currency', currency: room.currency }).format(room.time_slot_cost)

		return (
			<div>
				<h3>{this.props.room.name}<div className={'pull-right'}>{cost}</div></h3>
				<h4>{T.translate("book_meeting.day")} {getDayNumberFromDate(days, date)}, {getFormatedDate(date)}, {getFormatedTime(slot.start_date)} - {getFormatedTime(slot.end_date)}</h4>
			
				{/*<h3>Send an invite to the following:</h3>*/}
					{/*<ul><li>- <input /> +</li></ul>*/}
				<br  />
				<p>{T.translate("book_meeting.must_cancel_within")}</p>

				{/* Book this room button */}
				<div onClick={()=>{this.toggleModal(true)}} className={'btn btn-warning btn-lg btn-block'}>
					{T.translate("book_meeting.book_this_room")}
				</div>
				
				
				<Modal show={this.state.showModal} onClose={()=>{this.toggleModal(false)}} title={''}>
					{this.props.newReservation.loaded ? 
					<div>
						<div className={'book-meeting-profile-pic'}><img src={member.pic}/>
							<div className={'book-meeting-name'}>{member.first_name} {member.last_name}</div>
						</div>
						<StripeProvider apiKey={window.STRIPE_PRIVATE_KEY}>
							<Elements>
								<CheckoutForm price={room.time_slot_cost} submit={(ev, stripe, clientSecret)=>{payReservation(ev, stripe, clientSecret)}} clientSecret={this.props.newReservation.reservation.payment_gateway_client_token} />
							</Elements>
						</StripeProvider>
					</div> : ''}
				</Modal>
				
			</div>
		);
	}
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
		payReservation
	}
)(RoomBook)

