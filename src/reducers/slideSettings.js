import { TOGGLE_SETTING } from '../actions/actionTypes';

const initialState = {
	visible: false,
	showDots: true,
	coolButtons: false,
	autoplay: false
};

export default function(state = initialState, action) {
	//console.log('[Reducers] [Settings]..');
	//console.log('state: ' + JSON.stringify(state));

	switch (action.type) {
	case TOGGLE_SETTING:
		return { ...state, [action.payload]: !state[action.payload] };

	default:
		break;
	}

	return state;
}
