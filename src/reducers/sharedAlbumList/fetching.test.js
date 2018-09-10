import reducer from './fetching';
import * as types from '../../actions/actionTypes';

describe('sharedAlbumList fetching reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(false);
	});

	it('should handle FETCH_GET_SHARED_ALBUM_LIST_REQUEST SUCCESS FAILURE', () => {
		expect(
			reducer([], {
				type: types.FETCH_GET_SHARED_ALBUM_LIST_REQUEST
			})
		).toEqual(true);

		expect(
			reducer([], {
				type: types.FETCH_GET_SHARED_ALBUM_LIST_SUCCESS,
				body: {albums: ['a', 'b', 'c']}
			})
		).toEqual(false);

		expect(
			reducer([], {
				type: types.FETCH_GET_SHARED_ALBUM_LIST_FAILURE,
				body: {albums: ['a', 'b', 'c']}
			})
		).toEqual(false);
	});
});
