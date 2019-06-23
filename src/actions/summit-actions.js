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
import T from "i18n-react/dist/i18n-react";
import history from '../history'
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

export const REQUEST_SUMMIT           = 'REQUEST_SUMMIT';
export const RECEIVE_SUMMIT           = 'RECEIVE_SUMMIT';
// export const SET_CURRENT_SUMMIT       = 'SET_CURRENT_SUMMIT';

export const getSummitById = (summitId) => (dispatch, getState) => {

    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;
    dispatch(startLoading());

    let params = {
        access_token : accessToken,
        // expand: 'event_types,tracks'
    };

    return getRequest(
        createAction(REQUEST_SUMMIT),
        createAction(RECEIVE_SUMMIT),
        `${window.API_BASE_URL}/api/v1/summits/all/${summitId}`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}


// Cleaning out the summit
const normalizeEntity = (entity) => {
    let normalizedEntity = {...entity};

    delete(normalizedEntity['id']);
    delete(normalizedEntity['created']);
    delete(normalizedEntity['last_edited']);
    delete(normalizedEntity['logo']);
    delete(normalizedEntity['attendees_count']);
    delete(normalizedEntity['event_types']);
    delete(normalizedEntity['locations']);
    delete(normalizedEntity['max_submission_allowed_per_user']);
    delete(normalizedEntity['page_url']);
    delete(normalizedEntity['presentation_voters_count']);
    delete(normalizedEntity['presentation_votes_count']);
    delete(normalizedEntity['presentations_submitted_count']);
    delete(normalizedEntity['published_events_count']);
    delete(normalizedEntity['schedule_event_detail_url']);
    delete(normalizedEntity['schedule_page_url']);
    delete(normalizedEntity['speaker_announcement_email_accepted_alternate_count']);
    delete(normalizedEntity['speaker_announcement_email_accepted_count']);
    delete(normalizedEntity['speaker_announcement_email_accepted_rejected_count']);
    delete(normalizedEntity['speaker_announcement_email_alternate_count']);
    delete(normalizedEntity['speaker_announcement_email_alternate_rejected_count']);
    delete(normalizedEntity['speaker_announcement_email_rejected_count']);
    delete(normalizedEntity['speakers_count']);
    delete(normalizedEntity['ticket_types']);
    delete(normalizedEntity['time_zone']);
    delete(normalizedEntity['timestamp']);
    delete(normalizedEntity['tracks']);
    delete(normalizedEntity['wifi_connections']);

    if (!normalizedEntity['registration_begin_date']) normalizedEntity['registration_begin_date'] = null;
    if (!normalizedEntity['registration_end_date']) normalizedEntity['registration_end_date'] = null;
    if (!normalizedEntity['schedule_start_date']) normalizedEntity['schedule_start_date'] = null;
    if (!normalizedEntity['start_showing_venues_date']) normalizedEntity['start_showing_venues_date'] = null;
    if (!normalizedEntity['start_date']) normalizedEntity['start_date'] = null;
    if (!normalizedEntity['end_date']) normalizedEntity['end_date'] = null;

    return normalizedEntity;

}
