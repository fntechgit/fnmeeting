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

class RoomBook extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showModal: false,
			emails: [],
			confirmed: false
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
		if(this.state.confirmed){
			return <div>
				<h3>Confirmation</h3>
				<h4>You have booked Boardroom 101</h4>
				<h3>Day 1, Oct 17, 9:00AM – 9:30AM</h3>
				<h3>An invitation has been sent  to the following:</h3>
				<ul><li>mike@sicdigital.com</li></ul><br  />
				<p>You must cancel within 24hrs. of your reservation, or with 24hrs. notice for a full refund. Otherwise, your reservation is non-refundable.</p><br  />
			</div>
		}
		return (
			<div>
				<h3>Sky Lounge</h3>
				<h4>Day 1, Oct 17, 9:00AM – 9:30AM</h4><br  />
				<h3>Send an invite to the following:</h3>
					<ul><li>- <input /> +</li></ul>
				<br  /><br  />
				<p>You must cancel within 24hrs. of your reservation, or with 24hrs. notice for a full refund. Otherwise, your reservation is non-refundable.</p><br  />
				
				<Modal show={this.state.showModal} onClose={()=>{this.toggleModal(false)}} title={''}>
					<div>
						<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
							<Elements>
								<CheckoutForm price={90.00} />
							</Elements>
						</StripeProvider>
					</div>
				</Modal>
				<div onClick={()=>{this.toggleModal(true)}} className={'btn btn-warning btn-lg btn-block'}>Book This Room</div>
			</div>
		);
	}
}

export default RoomBook;
