import { LOGOUT_USER } from 'openstack-uicore-foundation/lib/security/actions';
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
			return {...state, summits: data, loading: false};
		}
			break;
		default:
			return state;
	}

}

export default allSummitsReducer
