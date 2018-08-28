import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './albumActions';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Album Test Cases', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
		fetchMock
			.getOnce('/photo/getAlbumList', { body: { albumList: ['a', 'b', 'c'] }, headers: { 'content-type': 'application/json' } });
		const expectedActions = [
			{ type: types.FETCH_GET_ALBUM_LIST_REQUEST },
			{ type: types.FETCH_GET_ALBUM_LIST_SUCCESS, body: { albumList: ['a', 'b', 'c'] } }
		];
		const store = mockStore({ albumList: [] });

		return store.dispatch(actions.fetchGetAlbumList()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
