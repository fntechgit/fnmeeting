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

import {
	getRequest,
	createAction,
	stopLoading,
	startLoading,
	authErrorHandler
} from 'openstack-uicore-foundation/lib/methods';

export const REQUEST_RESERVATIONS            = 'REQUEST_RESERVATIONS';
export const RECEIVE_RESERVATIONS            = 'RECEIVE_RESERVATIONS';

export const getMyReservations = () => (dispatch, getState) => {

	let { loggedUserState, summitReducer } = getState();
	let { accessToken }     = loggedUserState;
	let { currentSummit }   = summitReducer;

	dispatch(startLoading());

	let params = {
		access_token : accessToken,
		expand: 'room,floor',
	};

	return getRequest(
		createAction(REQUEST_RESERVATIONS),
		createAction(RECEIVE_RESERVATIONS),
		`${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms/all/reservations/me`,
		authErrorHandler
	)(params)(dispatch).then(() => {
			dispatch(stopLoading());
		}
	);
}




