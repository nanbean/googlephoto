import * as types from '../actions/actionTypes';

const initialState = false;

export default function auth (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_AUTH_SUCCESS:
		if (action.body && typeof action.body.auth !== 'undefined') {
			return action.body.auth;
		}

		return state;
	default:
		return state;
	}
}
