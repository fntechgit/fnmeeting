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
import { Switch, Route, Router } from 'react-router-dom'
import PrimaryLayout from "./layouts/primary-layout"
import SummitsPage from "./pages/summits-page"
import AuthorizedRoute from './routes/authorized-route'
import AuthorizationCallbackRoute from "./routes/authorization-callback-route"
import LogOutCallbackRoute from './routes/logout-callback-route'
import AuthButton from './components/auth-button'
import DefaultRoute from './routes/default-route'
import { connect } from 'react-redux'
import { AjaxLoader } from "openstack-uicore-foundation/lib/components";
import { getBackURL } from "openstack-uicore-foundation/lib/utils/methods";
import { resetLoading } from "openstack-uicore-foundation/lib/utils/actions";
import { doLogout, onUserAuth, getUserInfo} from 'openstack-uicore-foundation/lib/security/actions';
import { initLogOut, doLoginBasicLogin, getIdToken} from 'openstack-uicore-foundation/lib/security/methods';
import T from 'i18n-react';
import CustomErrorPage from "./pages/custom-error-page";
import history from './history'
import IdTokenVerifier from 'idtoken-verifier';


// here is set by default user lang as en
let language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

// language would be something like es-ES or es_ES
// However we store our files with format es.json or en.json
// therefore retrieve only the first 2 digits

if (language.length > 2) {
  language = language.split("-")[0];
  language = language.split("_")[0];
}

//console.log(`user language is ${language}`);

try {
  const i18nGlobalResources = require(`./i18n/${language}.json`);
  T.setTexts(i18nGlobalResources);
} catch (e) {
  T.setTexts(require(`./i18n/en.json`));
}

// move all env var to global scope so ui core has access to this

window.IDP_BASE_URL = process.env['IDP_BASE_URL'];
window.API_BASE_URL = process.env['API_BASE_URL'];
window.MARKETING_API_BASE_URL = process.env['MARKETING_API_BASE_URL'];
window.OAUTH2_CLIENT_ID = process.env['OAUTH2_CLIENT_ID'];
window.SCOPES = process.env['SCOPES'];
window.ALLOWED_USER_GROUPS = process.env['ALLOWED_USER_GROUPS'];
window.OAUTH2_FLOW = process.env['OAUTH2_FLOW'] || "token id_token";
window.TIMEINTERVALSINCE1970_API_URL= process.env['TIMEINTERVALSINCE1970_API_URL'];
window.CANCELLATION_PERIOD_IN_HOURS = process.env['CANCELLATION_PERIOD_IN_HOURS'] || 24;
window.SUPPORT_EMAIL = process.env['SUPPORT_EMAIL'] || null;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    props.resetLoading();
  }

  onClickLogin(){
    doLoginBasicLogin(getBackURL());
  }

  getHeaderLink = () => {
    const {currentSummit} = this.props;
    if (currentSummit?.id) {
      return `/a/${currentSummit.id}/my-meetings`;
    } else {
      return '/a/summits'
    }
  }

  render() {
    let { currentSummit, isLoggedUser, onUserAuth, doLogout, member, backUrl} = this.props;

    // get user pic from idtoken claims (IDP)
    let profile_pic = member ? member.pic : '';

    const idToken = getIdToken();

    if(idToken){
      let verifier = new IdTokenVerifier({
        issuer:   window.IDP_BASE_URL,
        audience: window.OAUTH2_CLIENT_ID
      });
      let jwt = verifier.decode(idToken);
      profile_pic = jwt.payload.picture;
    }

    return (
        <Router history={history}>
          <div>
            <AjaxLoader show={ this.props.loading } size={ 120 }/>
            <div className="header">
              <div className={"header-title " + (isLoggedUser ? '' : 'center')}>
                <a href={this.getHeaderLink()}>{T.translate("general.app_title")}</a> {currentSummit?.id > 0 && ` - ${currentSummit.name}`}
                <AuthButton isLoggedUser={isLoggedUser} picture={profile_pic} doLogin={this.onClickLogin.bind(this)} initLogOut={initLogOut}/>
              </div>
            </div>
            <Switch>
              <AuthorizedRoute currentSummit={currentSummit} isLoggedUser={isLoggedUser} backUrl={backUrl} path="/a/summits" component={SummitsPage} />
              <AuthorizedRoute currentSummit={currentSummit} isLoggedUser={isLoggedUser} backUrl={backUrl} path="/a/:id(\d+)" component={PrimaryLayout} />
              <AuthorizationCallbackRoute onUserAuth={onUserAuth} path='/auth/callback'/>
              <LogOutCallbackRoute doLogout={doLogout}  path='/auth/logout'/>
              <Route path="/logout" render={props => (<p>404 - Not Found</p>)}/>
              <Route path="/404" render={props => (<p>404 - Not Found</p>)}/>
              <Route path="/error" component={CustomErrorPage}/>
              <DefaultRoute isLoggedUser={isLoggedUser} />
            </Switch>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = ({ loggedUserState, baseState, summitReducer }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
  member: loggedUserState.member,
  loading : baseState.loading,
  currentSummit: summitReducer.currentSummit
})

export default connect(mapStateToProps, {
  onUserAuth,
  doLogout,
  getUserInfo,
  resetLoading
})(App)
