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
	loaded: false
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

			// for(var key in entity) {
			// 	if(entity.hasOwnProperty(key)) {
			// 		entity[key] = (entity[key] == null) ? '' : entity[key] ;
			// 	}
			// }

			return {...state, reservations: entity, errors: {}};
		}
			break;
		default:
			return state;
	}

}

export default reservationsReducer
