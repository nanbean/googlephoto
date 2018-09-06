import * as types from '../actions/actionTypes';

const initialState = [];

export default function sharedAlbumList (state = initialState, action) {
	switch (action.type) {
	case types.FETCH_GET_SHARED_ALBUM_LIST_SUCCESS:
		if (action.body && action.body.sharedAlbums) {
			return action.body.sharedAlbums;
		}

		return state;
	default:
		return state;
	}
}
