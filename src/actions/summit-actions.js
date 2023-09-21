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
} from 'openstack-uicore-foundation/lib/utils/actions';

export const REQUEST_SUMMIT           = 'REQUEST_SUMMIT';
export const RECEIVE_SUMMIT           = 'RECEIVE_SUMMIT';
export const REQUEST_SUMMITS          = 'REQUEST_SUMMITS';
export const RECEIVE_SUMMITS          = 'RECEIVE_SUMMITS';

export const getSummitById = (summitId) => (dispatch, getState) => {

    dispatch(startLoading());

    let params = {
        expand: 'meeting_booking_room_allowed_attributes,meeting_booking_room_allowed_attributes.values'
    };

    return getRequest(
        createAction(REQUEST_SUMMIT),
        createAction(RECEIVE_SUMMIT),
        `${window.API_BASE_URL}/api/public/v1/summits/all/${summitId}`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
};

export const loadSummits = (nowUTC) => (dispatch, getState) => {

    dispatch(startLoading());

    let params = {
        expand: 'none',
        relations: 'payment_profiles',
        page: 1,
        per_page: 100,
    };

    const filter = [];
    filter.push(`end_allow_booking_date>=${nowUTC}`);

    params['filter[]']= filter;

    getRequest(
        createAction(REQUEST_SUMMITS),
        createAction(RECEIVE_SUMMITS),
        `${window.API_BASE_URL}/api/public/v1/summits/all`,
        authErrorHandler
    )(params)(dispatch, getState).then(() => {
            dispatch(stopLoading());
        }
    );
}
