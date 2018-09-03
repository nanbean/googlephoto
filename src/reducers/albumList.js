import * as types from '../actions/actionTypes';

const initialState = [];

export default function albumList (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_ALBUM_LIST_SUCCESS:
		if (action.body && action.body.albums) {
			return action.body.albums;
		}

		return state;
	default:
		return state;
	}
}
