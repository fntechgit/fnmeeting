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
import URI from "urijs";
import swal from "sweetalert2";
import Select from 'react-select';

import TextInput from './number-input'

import T from "i18n-react";

class RoomSearch extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			size: props.size ? props.size : null,
		}

		this.options = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' },
		];
		
		if(props.date){
			this.state.date = this.options.find(o => o.value === props.date)
		}
		
		console.log(this.state.date)
	}

	componentDidMount() {
		// let query = URI.parseQuery(this.props.location.search);
		// swal(query.error,
		// 	query.error_description,
		// 	"error");
	}

	dateSelect(option){
		this.setState({'date': option})
	}
	
	numberChange(event){
		this.setState({'size': event.target.value})
	}
	
	submitSearch(){
		this.props.onSubmit({date: this.state.date.value, size: this.state.size})
	}
	
	render(){

		
		return (
			<div>
				<div className="form-group">
					<label>{T.translate("book_meeting.i_need_to_book")}</label>
					<Select
						id="day-select"
						value={this.state.date}
						onChange={(option) => {this.dateSelect(option)}}
						options={this.options}
						placeholder={T.translate("general.select") || this.state.date}
						isClearable={false}
					/>
				</div>
				
				{this.state.date ? <div><div className="form-group form-inline inline-number-field">
					<label className={"pr-1"}>{T.translate("book_meeting.for_how_many")}</label>
					<div className="input-group"><TextInput value={this.state.size} onChange={(event)=>{this.numberChange(event)}}className={'input-number'}/></div>
					</div>
					{this.state.size ? <div onClick={()=>{this.submitSearch()}} className={'btn btn-warning btn-lg btn-block'}>Find a room</div> : null}
				</div> : null}
			</div>
		);
	}
}

export default RoomSearch;
