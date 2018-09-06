import reducer from './albumItems';
import * as types from '../actions/actionTypes';

describe('albumItems reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([]);
	});

	it('should handle FETCH_GET_ALBUM_ITEMS_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.FETCH_GET_ALBUM_ITEMS_SUCCESS,
				body: {pictures: ['a', 'b', 'c']}
			})
		).toEqual(['a', 'b', 'c']);

		expect(
			reducer(
				['a', 'b', 'c'],
				{
					type: types.FETCH_GET_ALBUM_ITEMS_SUCCESS,
					body: {pictures: ['a', 'b', 'c', 'd']}
				}
			)
		).toEqual(['a', 'b', 'c', 'd']);
	});
});
