import * as types from './actionTypes';

const fetchGetAlbumListRequest = () => ({
	type: types.FETCH_GET_ALBUM_LIST_REQUEST
});

export const fetchGetAlbumListSuccess = body => ({
	type: types.FETCH_GET_ALBUM_LIST_SUCCESS,
	body
});

export const fetchGetAlbumListFailure = ex => ({
	type: types.FETCH_GET_ALBUM_LIST_FAILURE,
	ex
});

export const fetchGetAlbumList = () => dispatch => {
	const apiUrl = '/photo/getAlbumList';

	dispatch(fetchGetAlbumListRequest());
	return fetch(apiUrl)
		.then(res => res.json())
		.then(body => dispatch(fetchGetAlbumListSuccess(body)))
		.catch(ex => dispatch(fetchGetAlbumListFailure(ex)));
};
