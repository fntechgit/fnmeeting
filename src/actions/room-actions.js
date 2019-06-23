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
    putRequest,
    postRequest,
    deleteRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
    postFile,
    putFile,
    authErrorHandler
} from 'openstack-uicore-foundation/lib/methods';
import history from "../../../fn-summit/src/history";

export const REQUEST_ROOMS            = 'REQUEST_ROOMS';
export const RECEIVE_ROOMS            = 'RECEIVE_ROOMS';

export const REQUEST_ROOM_AVAILABILITY = 'REQUEST_ROOM_AVAILABILITY';
export const RECEIVE_ROOM_AVAILABILITY = 'RECEIVE_ROOM_AVAILABILITY';


export const getBookableRooms = () => (dispatch, getState) => {

    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;
    let { currentSummit }   = currentSummitState;

    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        // expand: 'event_types,tracks'
    };

    return getRequest(
        createAction(REQUEST_ROOMS),
        createAction(RECEIVE_ROOMS),
        `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

export const getRoomAvailability = (roomId, day) => (dispatch, getState) => {

    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;
    let { currentSummit }   = currentSummitState;
    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        // expand: 'event_types,tracks'
    };

    return getRequest(
        createAction(REQUEST_ROOM_AVAILABILITY),
        createAction(RECEIVE_ROOM_AVAILABILITY),
        `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms/${room_id}/availability/${day}`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

export const createBookableRoomReservation = (entity) => (dispatch, getState) => {
    let { loggedUserState, currentSummitState } = getState();
    let { accessToken }     = loggedUserState;
    let { currentSummit }   = currentSummitState;

    dispatch(startLoading());

    let normalizedEntity = normalizeEntity(entity);

    let params = {
        access_token : accessToken,
    };

    if (entity.id) {
        putRequest(
            createAction(UPDATE_RSVP_TEMPLATE),
            createAction(RSVP_TEMPLATE_UPDATED),
            `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms/${room_id}/reservations`,
            normalizedEntity,
            authErrorHandler,
            entity
        )(params)(dispatch)
            .then((payload) => {
                dispatch(showSuccessMessage(T.translate("edit_rsvp_template.rsvp_template_saved")));
            });

    } else {
        let success_message = {
            title: T.translate("general.done"),
            html: T.translate("edit_rsvp_template.rsvp_template_created"),
            type: 'success'
        };

        postRequest(
            createAction(UPDATE_RSVP_TEMPLATE),
            createAction(RSVP_TEMPLATE_ADDED),
            `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/rsvp-templates`,
            normalizedEntity,
            authErrorHandler,
            entity
        )(params)(dispatch)
            .then((payload) => {
                dispatch(showMessage(
                    success_message,
                    () => { history.push(`/app/summits/${currentSummit.id}/rsvp-templates/${payload.response.id}`) }
                ));
            });
    }
}
