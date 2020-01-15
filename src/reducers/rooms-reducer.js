import {REQUEST_ROOMS, RECEIVE_ROOMS} from '../actions/room-actions';

export const DEFAULT_ENTITY = {
	current_page: 1,
	data: null,
	last_page: 1,
	per_page: 5,
	total: 0
};

const DEFAULT_STATE = {
	rooms: DEFAULT_ENTITY,
	errors: {},
	loaded: false,
	loading: false,
}

const roomsReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case REQUEST_ROOMS: {
			return {...state, loading: true}
		}
			break;
		case RECEIVE_ROOMS: {
			let entity = {...payload.response};
			return {...state, rooms: entity, errors: {}, loaded: true};
		}
			break;
		default:
			return state;
	}

}

export default roomsReducer
