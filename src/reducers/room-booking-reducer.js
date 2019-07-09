import {CREATE_RESERVATION, CREATE_RESERVATION_SUCCESS} from '../actions/room-actions';

export const DEFAULT_ENTITY = {
	current_page: 1,
	data: [],
	last_page: 0,
	per_page: 0,
	total: 0
};

const DEFAULT_STATE = {
	reservation: DEFAULT_ENTITY,
	errors: {},
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
			return {...state, reservation: entity, errors: {}, loading: false, loaded: true};
		}
			break;
		default:
			return state;
	}

}

export default newReservationReducer
