import * as actions from './webOSActions';
import * as types from './actionTypes';

describe('webOSActions Test Cases', () => {
	it('creates create an action to set cursor state', () => {
		const expectedAction = {type: types.SET_CURSORSTATE, cursorState: true};
		expect(actions.setCursorState(true)).toEqual(expectedAction);
	});
});
