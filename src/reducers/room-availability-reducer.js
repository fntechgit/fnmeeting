import {REQUEST_ROOM_AVAILABILITY, RECEIVE_ROOM_AVAILABILITY, REQUEST_ROOM, RECEIVE_ROOM} from '../actions/room-actions';

export const DEFAULT_ENTITY = {
	current_page: 1,
	data: null,
	last_page: 0,
	per_page: 0,
	total: 0
};

const DEFAULT_STATE = {
	availability: DEFAULT_ENTITY,
	room: null,
	errors: {},
	loaded: false,
	loading: true,
}

const roomAvailabilityReducer = (state = DEFAULT_STATE, action) => {
	const { type, payload } = action
	switch (type) {
		case REQUEST_ROOM_AVAILABILITY: {
			return {...state, loading: true}
		}
		break;
		case RECEIVE_ROOM_AVAILABILITY: {
			let entity = {...payload.response};
			return {...state, availability: entity, errors: {}, loading: false, loaded: true};
		}
		break;
		case REQUEST_ROOM: {
			return {...state, loading: true}
		}
		break;
		case RECEIVE_ROOM: {
			let entity = {...payload.response};
			return {...state, room: entity, loading: false, loaded: true};
		}
		break;
		default:
			return state;
	}

}

export default roomAvailabilityReducer
