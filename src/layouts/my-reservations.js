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

import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import MyMeetingsPage from "../pages/meetings/my-meetings-page"
import {getMyReservations, cancelReservation} from '../actions/reservation-actions'
import T from 'i18n-react'

const MyReservations = ({myReservations, summit, nowUtc, cancelReservation, getMyReservations, loadedRes}) => {

  useEffect(() => {
    if(summit.loaded && !summit.loading) {
      getMyReservations();
    }
  }, [summit.loaded, summit.loading]);

  return(
    <div>
      <h2>{T.translate('my_reservations.page_title')}</h2>
      <MyMeetingsPage
        reservations={myReservations}
        summit={summit.currentSummit}
        loadedRes={loadedRes}
        nowUtc={nowUtc}
        cancelReservation={cancelReservation}
      />
    </div>
  );

}

const mapStateToProps = ({ summitReducer, reservationsReducer, loggedUserState, clockState }) => ({
  summit: summitReducer,
  myReservations: reservationsReducer.reservations,
  member: loggedUserState.member,
  nowUtc: clockState.nowUtc,
  loadedRes: reservationsReducer.loaded
})

export default connect(
    mapStateToProps,
    {getMyReservations, cancelReservation}
)(MyReservations)
