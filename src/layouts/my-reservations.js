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

import React from 'react'
import { connect } from 'react-redux';
import MyMeetingsPage from "../pages/meetings/my-meetings-page"
import {getMyReservations} from '../actions/reservation-actions'

class MyReservations extends React.Component {

  componentDidMount() {
    let {currentSummit, getMyReservations} = this.props;
    if(currentSummit !== null) {
      getMyReservations()
    }
  }

  componentWillReceiveProps(newProps) {
    let {currentSummit, getMyReservations} = this.props;
    if (currentSummit !== null && currentSummit.id != newProps.currentSummit.id) {
      getMyReservations()
    }
  }

  render(){
    let { match, location, member } = this.props;

    return(
        <MyMeetingsPage /> 
    );
  }

}

const mapStateToProps = ({ summitReducer, reservationsReducer, loggedUserState }) => ({
  currentSummit: summitReducer.currentSummit,
  myReservations: reservationsReducer.reservations,
  member: loggedUserState.member
})

export default connect(
    mapStateToProps,
    {getMyReservations}
)(MyReservations)