import * as types from '../../actions/actionTypes';

const initialState = false;

export default function fullScreen (state = initialState, action) {
	switch (action.type) {
	case types.SET_FULL_SCREEN:
		return action.ex;
	default:
		return state;
	}
}
