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
    postRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    authErrorHandler
} from 'openstack-uicore-foundation/lib/utils/actions';
import T from "i18n-react/dist/i18n-react"
import history from "../../src/history";
import { getAccessTokenSafely } from '../utils/helpers';


export const REQUEST_ROOMS            = 'REQUEST_ROOMS';
export const RECEIVE_ROOMS            = 'RECEIVE_ROOMS';

export const REQUEST_ROOM            = 'REQUEST_ROOM';
export const RECEIVE_ROOM            = 'RECEIVE_ROOM';

export const REQUEST_ROOM_AVAILABILITY = 'REQUEST_ROOM_AVAILABILITY';
export const RECEIVE_ROOM_AVAILABILITY = 'RECEIVE_ROOM_AVAILABILITY';

export const CREATE_RESERVATION            = 'CREATE_RESERVATION';
export const CREATE_RESERVATION_SUCCESS    = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_ERROR      = 'CREATE_RESERVATION_ERROR';
export const CLEAR_RESERVATION             = 'CLEAR_RESERVATION';

export const getBookableRooms = (date, size, ammenities, current_page = 1, per_page = 5) => async (dispatch, getState) => {
    const { summitReducer} = getState();
    const accessToken = await getAccessTokenSafely();
    const { currentSummit }   = summitReducer;
    const filter = [];

    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        expand: 'floor,attributes.type',
        per_page: per_page,
        page: current_page
    }

    if(date && size){
        filter.push(`availability_day==${date}`);
        filter.push(`capacity>=${size}`);
    }

    // Add ammenities filters
    if(ammenities){
        filter.push(`attribute==${ammenities.join('&&')}`);
    }

    params['filter[]']= filter;

    return getRequest(
        createAction(REQUEST_ROOMS),
        createAction(RECEIVE_ROOMS),
        `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
};

export const getBookableRoom = (room_id) => async (dispatch, getState) => {
    const { summitReducer } = getState();
    const accessToken = await getAccessTokenSafely();
    const { currentSummit }   = summitReducer;
    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        expand: 'floor,attributes.type'
    };

    return getRequest(
        createAction(REQUEST_ROOM),
        createAction(RECEIVE_ROOM),
        `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms/${room_id}`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
};

export const getRoomAvailability = (room_id, day) => async (dispatch, getState) => {

    const { summitReducer } = getState();
    const accessToken = await getAccessTokenSafely();
    const { currentSummit }   = summitReducer;
    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        expand: 'floor'
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

export const clearReservation = () => (dispatch, getState) => {
    dispatch(createAction(CLEAR_RESERVATION)())
}

export const createReservation = (room_id, start_time, end_time, currency, amount) => async (dispatch, getState) => {
    const { summitReducer } = getState();
    const accessToken = await getAccessTokenSafely();
    const { currentSummit }   = summitReducer;

    dispatch(startLoading());

    let normalizedEntity = {room_id, start_datetime: start_time, end_datetime: end_time, currency, amount}

    let params = {
        access_token : accessToken,
    };


    return postRequest(
        createAction(CREATE_RESERVATION),
        createAction(CREATE_RESERVATION_SUCCESS),
        `${window.API_BASE_URL}/api/v1/summits/${currentSummit.id}/locations/bookable-rooms/${room_id}/reservations`,
        normalizedEntity,
        authErrorHandler,
        // entity
    )(params)(dispatch)
        .then((payload) => {
            dispatch(stopLoading());
            return (payload)
        })
        .catch(e => {
            dispatch(createAction(CREATE_RESERVATION_ERROR)(e))
            return(e)
        })
}

export const payReservation = (token, stripe) => (dispatch, getState) => {
    const {newReservationReducer, summitReducer} = getState();
    const {reservation} = newReservationReducer;
    const { id, card } = token;

    if (card._empty || card._invalid) {
        return false
    } else {
        dispatch(startLoading());

        stripe.confirmCardPayment(
          reservation.payment_gateway_client_token, { payment_method: { card: { token: id } } }
        ).then(function(result) {
            if (result.error) {
                // Display error.message in your UI.
                dispatch(showMessage({
                        title: T.translate("book_meeting.reservation_error"),
                        type: 'warning'
                    },
                    () => location.reload()
                ));
            } else {
                dispatch(stopLoading());
                dispatch(showMessage(
                    {
                        title: T.translate("book_meeting.reservation_created_title"),
                        text: T.translate("book_meeting.reservation_created_subtitle"),
                        type: 'success'
                    },
                    () => { history.push(`/a/${summitReducer.currentSummit.id}/my-meetings`) }
                ));
                // The payment has succeeded. Display a success message.
            }
        });
    }
}
