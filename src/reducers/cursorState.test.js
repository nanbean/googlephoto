import reducer from './cursorState';
import * as types from '../actions/actionTypes';

describe('cursorState reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(false);
	});

	it('should handle FETCH_GET_ALBUM_LIST_SUCCESS', () => {
		expect(
			reducer(false, {
				type: types.SET_CURSORSTATE,
				cursorState: true
			})
		).toEqual(true);

		expect(
			reducer(true, {
				type: types.SET_CURSORSTATE,
				cursorState: false
			})
		).toEqual(false);
	});
});
