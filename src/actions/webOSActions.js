import * as types from './actionTypes';

export const setCursorState = params => {
	return {
		type: types.SET_CURSORSTATE,
		cursorState: params
	};
};
