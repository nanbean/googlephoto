import * as types from '../../actions/actionTypes';

const initialState = false;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_FILTERED_ITEMS_SUCCESS:
	case types.FETCH_GET_FILTERED_ITEMS_FAILURE:
		return false;
	case types.FETCH_GET_FILTERED_ITEMS_REQUEST:
		return true;
	default:
		return state;
	}
}
