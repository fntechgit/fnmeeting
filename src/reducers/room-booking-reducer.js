import {CREATE_RESERVATION, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_ERROR, CLEAR_RESERVATION} from '../actions/room-actions';

export const DEFAULT_ENTITY = {
	current_page: 1,
	data: [],
	last_page: 0,
	per_page: 0,
	total: 0
};

const DEFAULT_STATE = {
	reservation: DEFAULT_ENTITY,
	errors: null,
	loaded: false,
	loading: false
}

const newReservationReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case CREATE_RESERVATION: {
			return DEFAULT_STATE
		}
			break;
		case CREATE_RESERVATION_SUCCESS: {
			let entity = {...payload.response};
			return {...state, reservation: entity, errors: null, loading: false, loaded: true};
		}
		case CREATE_RESERVATION_ERROR: {
			let entity = {...payload.err};
			return {...state, reservation: false, errors: payload.err, loading: false, loaded: true};
		}
		case CLEAR_RESERVATION: {
			return DEFAULT_STATE
		}
			break;
		default:
			return state;
	}

}

export default newReservationReducer
