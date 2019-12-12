import { LOGOUT_USER, VALIDATE } from 'openstack-uicore-foundation/lib/actions';
import {REQUEST_SUMMITS, RECEIVE_SUMMITS} from '../../actions/summit-actions';

const DEFAULT_STATE = {
	summits: [],
	loading: false,
};

const allSummitsReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case LOGOUT_USER: {
			return DEFAULT_STATE
		}
			break;
		case REQUEST_SUMMITS: {
			return {...DEFAULT_STATE, loading: true}
		}
			break;
		case RECEIVE_SUMMITS: {
			let {data} = payload.response;
			let now = Math.floor(Date.now()/1000);

			let activeSummits = data.filter(s => {
				return s.begin_allow_booking_date < now && s.end_allow_booking_date > now;
			});

			return {...state, summits: activeSummits, loading: false};
		}
			break;
		default:
			return state;
	}

}

export default allSummitsReducer
