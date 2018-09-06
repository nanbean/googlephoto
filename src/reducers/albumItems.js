import * as types from '../actions/actionTypes';

const initialState = [];

export default function albumItems (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_ALBUM_ITEMS_SUCCESS:
		if (action.body && action.body.pictures) {
			return action.body.pictures;
		}

		return state;
	case types.CLEAR_ALBUM_ITEMS:
		return initialState;
	default:
		return state;
	}
}
