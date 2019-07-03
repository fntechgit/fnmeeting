import {REQUEST_RESERVATIONS, RECEIVE_RESERVATIONS} from '../actions/reservation-actions';

export const DEFAULT_ENTITY = {
	current_page: 1,
	data: [],
	last_page: 0,
	per_page: 0,
	total: 0
};

const DEFAULT_STATE = {
	reservations: DEFAULT_ENTITY,
	errors: {},
	loaded: false,
	loading: false
}

const reservationsReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case REQUEST_RESERVATIONS: {
			return DEFAULT_STATE
		}
			break;
		case RECEIVE_RESERVATIONS: {
			let entity = {...payload.response};
			return {...state, reservations: entity, errors: {}, loading: false, loaded: true};
		}
			break;
		default:
			return state;
	}

}

export default reservationsReducer
