import * as types from '../actions/actionTypes';

const initialState = [];

export default function filterItems (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_FILTERED_ITEMS_SUCCESS:
		if (action.body && action.body.pictures) {
			return action.body.pictures;
		}

		return state;
	case types.CLEAR_FILTERED_ITEMS:
		return initialState;
	default:
		return state;
	}
}
