import * as types from '../actions/actionTypes';

const initialState = [];

export default function filterList (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_FILTER_LIST_SUCCESS:
		if (action.body && action.body.filterList) {
			return action.body.filterList;
		}

		return state;
	default:
		return state;
	}
}
