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

const fetchGetAlbumItemsRequest = () => ({
	type: types.FETCH_GET_ALBUM_ITEMS_REQUEST
});

export const fetchGetAlbumItemsSuccess = body => ({
	type: types.FETCH_GET_ALBUM_ITEMS_SUCCESS,
	body
});

export const fetchGetAlbumItemsFailure = ex => ({
	type: types.FETCH_GET_ALBUM_ITEMS_FAILURE,
	ex
});

export const fetchGetAlbumItems = (albumId) => dispatch => {

	if (albumId) {
		const apiUrl = `/photo/album/${albumId}`;

		dispatch(fetchGetAlbumItemsRequest());
		return fetch(apiUrl)
			.then(res => res.json())
			.then(body => dispatch(fetchGetAlbumItemsSuccess(body)))
			.catch(ex => dispatch(fetchGetAlbumItemsFailure(ex)));
	}

};

export const clearAlbumItems = ex => ({
	type: types.CLEAR_ALBUM_ITEMS,
	ex
});
