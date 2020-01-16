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
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import {loadSummits} from '../actions/summit-actions'

class SummitsPage extends React.Component {

	constructor (props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadSummits();
	}

	render() {
		let {summits} = this.props;
		const nowEpoch = Math.round(Date.now() / 1000);

		let availableSummits = summits.filter(s => s.begin_allow_booking_date < nowEpoch && nowEpoch < s.end_allow_booking_date);

		if (availableSummits.length === 1) {
			let summitId = availableSummits[0].id;
			return (
                <Redirect to={{pathname: `/a/${summitId}/my-meetings`}} />
			);
		}

		return (
            <div className="primary-layout">
                <main id="page-wrap">
					<h1>Pick a Show</h1>

					<div className="row summits-wrapper">
						{availableSummits.length === 0 &&
							<p>There are not shows Available.</p>
						}
						{availableSummits.length > 0 &&  availableSummits.map(s =>
						<div className="col-md-4" key={`summit_${s.id}`}>
							<a href={`/a/${s.id}/my-bookings`} className="btn btn-default">
								{s.name}
							</a>
						</div>
					)}
					</div>
				</main>
			</div>
		);
	}
}

const mapStateToProps = ({ allSummitsReducer }) => ({
    summits: allSummitsReducer.summits,
});

export default connect(
    mapStateToProps,
    {loadSummits}
)(SummitsPage)
