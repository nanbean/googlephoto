import reducer from './albumList';
import * as types from '../actions/actionTypes';

describe('albumList reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([]);
	});

	it('should handle FETCH_GET_ALBUM_LIST_SUCCESS', () => {
		expect(
			reducer([], {
				type: types.FETCH_GET_ALBUM_LIST_SUCCESS,
				body: {albumList: ['a', 'b', 'c']}
			})
		).toEqual(['a', 'b', 'c']);

		expect(
			reducer(
				['a', 'b', 'c'],
				{
					type: types.FETCH_GET_ALBUM_LIST_SUCCESS,
					body: {albumList: ['a', 'b', 'c', 'd']}
				}
			)
		).toEqual(['a', 'b', 'c', 'd']);
	});
});
