import * as types from '../actions/actionTypes';

const initialState = '';

export default function filter (state = initialState, action) {
	switch (action.type) {
	case types.SET_FILTER:
		if (action.filter) {
			return action.filter;
		}

		return state;
	default:
		return state;
	}
}
