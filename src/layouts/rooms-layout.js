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
import { Switch, Route, Redirect } from 'react-router-dom';
import { Breadcrumbs, Breadcrumb } from 'react-breadcrumbs'

import RoomSearchLayout from "./rooms-search-layout"
import MeetingRoomAvailability from "../pages/meetings/room-single"

class BookAMeeting extends React.Component {
    render(){
        let { match, location, member } = this.props;
        return(
            <div>
                <Switch>
                    <Route exact path={`${match.path}/search`} component={RoomSearchLayout} />
                    <Route path={`${match.path}/:id`} component={MeetingRoomAvailability} />
                    <Route render={props => (<Redirect to={`${match.path}/search`}/>)}/>
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = ({ currentSummitState, loggedUserState }) => ({
    member: loggedUserState.member
})

// export default Restrict(, 'general');

export default connect(
    mapStateToProps,
    {}
)(BookAMeeting);

