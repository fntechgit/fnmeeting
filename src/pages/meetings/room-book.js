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
import {createReservation} from "../../actions/room-actions";
import {getDayNumberFromDate} from "../../utils/helpers";
import moment from "moment";

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

	render(){
		
		const {days, date, time, slot, room} = this.props
		
		if(this.state.confirmed){
			return <div>
				<h3>Confirmation</h3>
				<h4>You have booked Boardroom 101</h4>
				<h3>{date} - {time}</h3>
				{/*<h3>An invitation has been sent  to the following:</h3>*/}
				{/*<ul><li>mike@sicdigital.com</li></ul><br  />*/}
				<p>You must cancel within 24hrs. of your reservation, or with 24hrs. notice for a full refund. Otherwise, your reservation is non-refundable.</p><br  />
			</div>
		}
		
		return (
			<div>
				<h3>{this.props.room.name}<div className={'pull-right'}>${room.time_slot_cost}</div></h3>
				<h4>Day {getDayNumberFromDate(days, date)}, {moment.unix(date).format('MMM Do YYYY')}, {moment.unix(slot.start_date).format('HH:mm')} - {moment.unix(slot.end_date).format('HH:mm')}</h4>
			
				{/*<h3>Send an invite to the following:</h3>*/}
					{/*<ul><li>- <input /> +</li></ul>*/}
				<br  />
				<p>You must cancel within 24hrs. of your reservation, or with 24hrs. notice for a full refund. Otherwise, your reservation is non-refundable.</p><br  />
				
				<Modal show={this.state.showModal} onClose={()=>{this.toggleModal(false)}} title={''}>
					<div>
						<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
							<Elements>
								<CheckoutForm price={room.time_slot_cost} />
							</Elements>
						</StripeProvider>
					</div>
				</Modal>
				<div onClick={()=>{this.props.createReservation(room.id, slot.start_date, slot.end_date, room.currency, room.time_slot_cost)}} className={'btn btn-warning btn-lg btn-block'}>Book This Room</div>
			</div>
		);
	}
}

const mapStateToProps = ({ summitReducer}) => ({
	currentSummit: summitReducer.currentSummit,
})

export default connect(
	mapStateToProps,
	{createReservation}
)(RoomBook)

