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
import NavMenu from '../components/nav-menu'

import MyReservations from "./my-reservations"
import SearchRoomsLayout from "./rooms-layout"
import {getSummitById} from '../actions/summit-actions'

class PrimaryLayout extends React.Component {

  // TODO: React Router can handle this
  getActiveMenu() {
    let {location} = this.props;
    switch(location.pathname) {
      case '/app/my-meetings':
        return 'my-meetings';
        break;
      case '/app/rooms':
        return 'rooms';
        break
    }
  }

  componentDidMount() {
    let {currentSummit} = this.props;
    if(currentSummit.id === 0) {
      this.props.getSummitById('27');
    }
  }

  componentWillReceiveProps(newProps) {
    let {currentSummit} = this.props;

    if (currentSummit === null && currentSummit.id != newProps.currentSummit.id) {
      this.props.getSummitById(27);
    }
  }

  render(){
    let { match, location, member, currentSummit } = this.props;

    return(
        <div className="primary-layout">
          <div className="col-md-4">
            <NavMenu active={this.getActiveMenu()}/>
          </div>
          <div className="col-md-8">
            <main id="page-wrap">
              {(currentSummit.id !== 0) ? 
              <Switch>
                <Route strict exact path={`${match.path}/my-meetings`} component={MyReservations}/>
                <Route path={`${match.path}/rooms`} component={SearchRoomsLayout}/>
              </Switch>
              : 'Loading...' }
            </main>
          </div>
        </div>
    );
  }

}

const mapStateToProps = ({ summitReducer, loggedUserState }) => ({
  currentSummit: summitReducer.currentSummit,
  member: loggedUserState.member
})

export default connect(
    mapStateToProps,
    {getSummitById}
)(PrimaryLayout)