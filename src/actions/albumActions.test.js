import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './albumActions';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('albumActions Test Cases', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates FETCH_GET_ALBUM_LIST_SUCCESS when fetching fetchGetAlbumList has been done', () => {
		fetchMock
			.getOnce('/photo/getAlbumList', {body: {albums: ['a', 'b', 'c']}, headers: {'content-type': 'application/json'}});
		const expectedActions = [
			{type: types.FETCH_GET_ALBUM_LIST_REQUEST},
			{type: types.FETCH_GET_ALBUM_LIST_SUCCESS, body: {albums: ['a', 'b', 'c']}}
		];
		const store = mockStore({albumList: []});

		return store.dispatch(actions.fetchGetAlbumList()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates FETCH_GET_ALBUM_ITEMS_SUCCESS when fetching fetchGetAlbumItems has been done', () => {
		fetchMock
			.getOnce('/photo/album/test', {body: {mediaItems: ['a', 'b', 'c']}, headers: {'content-type': 'application/json'}});
		const expectedActions = [
			{type: types.FETCH_GET_ALBUM_ITEMS_REQUEST},
			{type: types.FETCH_GET_ALBUM_ITEMS_SUCCESS, body: {mediaItems: ['a', 'b', 'c']}}
		];
		const store = mockStore({mediaItems: []});

		return store.dispatch(actions.fetchGetAlbumItems('test')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
