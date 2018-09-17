import * as types from '../actions/actionTypes';

const initialState = false;

export default function cursorState (state = initialState, action) {
	switch (action.type) {
	case types.SET_CURSORSTATE:
		return action.cursorState;
	default:
		return state;
	}
}
