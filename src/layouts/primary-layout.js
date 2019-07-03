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
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import NavMenu from '../components/nav-menu'

import MyReservations from "./my-reservations"
import SearchRoomsLayout from "./rooms-layout"
import {getSummitById} from '../actions/summit-actions'

class PrimaryLayout extends React.Component {

  // TODO: React Router can handle this
  getActiveMenu() {
    let {location, match} = this.props;
    switch(location.pathname) {
      case `${match.path}/my-meetings`:
        return 'my-meetings';
        break;
      case `${match.path}/rooms`:
        return 'rooms';
        break
    }
  }

  componentDidMount() {
    let {summit, match} = this.props;
    if(!summit.loading && !summit.loaded) {

      let summitId = match.params.id
      
      this.props.getSummitById(summitId);
    }
  }
  
  render(){
    let { match, summit } = this.props;

    return(
        <div className="primary-layout">
          <div className="col-md-4">
            <NavMenu {...this.props}/>
          </div>
          <div className="col-md-8">
            <main id="page-wrap">
              {(summit.loaded) ? 
              <Switch>
                <Route strict exact path={`${match.url}/my-meetings`} component={MyReservations}/>
                <Route path={`${match.url}/rooms`} component={SearchRoomsLayout}/>
              </Switch>
              : 'Loading...' }
            </main>
          </div>
        </div>
    );
  }

}

const mapStateToProps = ({ summitReducer, loggedUserState, roomsReducer }) => ({
  summit: summitReducer,
  member: loggedUserState.member,
  rooms: roomsReducer.rooms,
})

export default connect(
    mapStateToProps,
    {getSummitById}
)(PrimaryLayout)