/**
 * Copyright 2017 OpenStack Foundation
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
import moment from "moment-timezone";
import React from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavMenu from '../components/nav-menu'

import MyReservations from "./my-reservations"
import SearchRoomsLayout from "./rooms-layout"
import BookingClosedPage from "../pages/booking-closed-page"
import {getSummitById} from '../actions/summit-actions'
import ClockComponent from '../components/clock';
class PrimaryLayout extends React.Component {

  componentDidMount() {
    let {summit, match} = this.props;
    if(!summit.loading && !summit.loaded && match.params.id) {
      this.props.getSummitById(match.params.id);
    }
  }

  render(){
    let { match, summit, nowUtc } = this.props;
    let {currentSummit, loaded} = summit;
    let summitId = match.params.id;

    let active = currentSummit.end_allow_booking_date >= moment(nowUtc).unix();

    if (loaded && !active) {
        return <BookingClosedPage summit={currentSummit} />
    }

    return(
        <div className="primary-layout">
            <div className="col-md-4">
                <NavMenu {...this.props}/>
            </div>
            <div className="col-md-8">
                <main id="page-wrap">
                    {summitId && summit.loaded &&
                        <>
                        <ClockComponent active={true} summit={summit} />
                        <Switch>
                            <Route strict exact path={`${match.url}/my-meetings`} component={MyReservations} />
                            <Route path={`${match.url}/rooms`} component={SearchRoomsLayout} />
                            <Redirect to={{ pathname: `${match.url}/my-meetings`}} />
                        </Switch>
                        </>
                    }
            </main>
            </div>
        </div>
    );
  }

}

const mapStateToProps = ({ summitReducer, loggedUserState, roomsReducer, clockState }) => ({
  summit: summitReducer,
  member: loggedUserState.member,
  rooms: roomsReducer.rooms,
  nowUtc: clockState.nowUtc,
})

export default connect(
    mapStateToProps,
    {getSummitById}
)(PrimaryLayout)
