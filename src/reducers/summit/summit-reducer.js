import{ LOGOUT_USER, VALIDATE } from 'openstack-uicore-foundation/lib/actions';
import {REQUEST_SUMMIT, RECEIVE_SUMMIT} from '../../actions/summit-actions';

export const DEFAULT_ENTITY = {
	id: 0,
	name: '',
	active: false,
	attendees_count: 0,
	available_on_api: false,
	calendar_sync_desc: '',
	calendar_sync_name: '',
	dates_label: '',
	end_date: 0,
	event_types: [],
	external_summit_id: '',
	link: '',
	locations: [],
	logo: null,
	max_submission_allowed_per_user: 0,
	page_url: '',
	presentation_voters_count: 0,
	presentation_votes_count: 0,
	presentations_submitted_count: 0,
	published_events_count: 0,
	registration_begin_date: 0,
	registration_end_date: 0,
	registration_link: '',
	schedule_event_detail_url: '',
	schedule_page_url: '',
	schedule_start_date: 0,
	secondary_registration_label: '',
	secondary_registration_link: '',
	speaker_announcement_email_accepted_alternate_count: 0,
	speaker_announcement_email_accepted_count: 0,
	speaker_announcement_email_accepted_rejected_count: 0,
	speaker_announcement_email_alternate_count: 0,
	speaker_announcement_email_alternate_rejected_count: 0,
	speaker_announcement_email_rejected_count: 0,
	speakers_count: 0,
	start_date: 0,
	start_showing_venues_date: 0,
	slug: '',
	ticket_types: [],
	time_zone: {},
	time_zone_id: '',
	timestamp: 0,
	tracks: [],
	type_id: 0,
	wifi_connections: [],
	selection_plans: []
}

const DEFAULT_STATE = {
	currentSummit: DEFAULT_ENTITY,
	errors: {},
	loading: false,
	loaded: false
}

const summitReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case LOGOUT_USER: {
			return DEFAULT_STATE
		}
			break;
		case REQUEST_SUMMIT: {
			return {...DEFAULT_STATE, loading: true}
		}
			break;
		case RECEIVE_SUMMIT: {
			let entity = {...payload.response};

			for(var key in entity) {
				if(entity.hasOwnProperty(key)) {
					entity[key] = (entity[key] == null) ? '' : entity[key] ;
				}
			}

			return {...state, currentSummit: entity, errors: {}, loading: false, loaded: true};
		}
			break;
		default:
			return state;
	}

}

export default summitReducer
