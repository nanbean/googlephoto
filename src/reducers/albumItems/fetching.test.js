import reducer from './fetching';
import * as types from '../../actions/actionTypes';

describe('albumItems fetching reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(false);
	});

	it('should handle FETCH_GET_ALBUM_ITEMS_REQUEST SUCCESS FAILURE', () => {
		expect(
			reducer([], {
				type: types.FETCH_GET_ALBUM_ITEMS_REQUEST
			})
		).toEqual(true);

		expect(
			reducer([], {
				type: types.FETCH_GET_ALBUM_ITEMS_SUCCESS,
				body: {pictures: ['a', 'b', 'c']}
			})
		).toEqual(false);

		expect(
			reducer([], {
				type: types.FETCH_GET_ALBUM_ITEMS_FAILURE,
				body: {pictures: ['a', 'b', 'c']}
			})
		).toEqual(false);
	});
});
