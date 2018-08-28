import * as types from '../actions/actionTypes';

const initialState = [];

export default function albumList (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_ALBUM_LIST_SUCCESS:
		if (action.body && action.body.albumList) {
			return action.body.albumLists;
		}

		return state;
	default:
		return state;
	}
}
