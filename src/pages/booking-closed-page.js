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
import '../styles/error-page.less';
import T from "i18n-react/dist/i18n-react";
import moment from "moment-timezone";
import { epochToMomentTimeZone, epochToMoment } from "openstack-uicore-foundation/lib/methods";

class BookingClosedPage extends React.Component {

    render(){
        let {name, begin_allow_booking_date, end_allow_booking_date, time_zone_id} = this.props.summit;
        let summitBookingStart = epochToMomentTimeZone(begin_allow_booking_date, time_zone_id).format('MMMM Do YYYY, h:mm:ss a');
        let summitBookingEnd = epochToMomentTimeZone(end_allow_booking_date, time_zone_id).format('MMMM Do YYYY, h:mm:ss a');
        return (
            <div className="error_page_wrapper container">
                <h1>{T.translate("landing.booking_closed")}</h1>
                <br/><br/>
                <p>
                    {`${name} room booking is open between `}
                    <strong>{summitBookingStart}</strong>
                    {` and `}
                    <strong>{summitBookingEnd}</strong>
                </p>
                <br/><br/>
                <a href="/a/summits">Pick another show</a>
            </div>
        );
  }
}

export default BookingClosedPage;
