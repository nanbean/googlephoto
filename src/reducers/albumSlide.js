import {
	SET_TRANSLATE_VALUE,
	SET_INDEX
} from '../actions/actionTypes';

const initialState = {
	albumItems: [],
	index: 0,
	translateValue: 0
};

export default function(state = initialState, action) {
	//console.log('[Reducers] [albumSlide]..');
	//console.log('state: ' + JSON.stringify(state));

	switch (action.type) {
	case SET_TRANSLATE_VALUE:
		//console.log('[Reducer] [albumSlide] SET_TRANSLATE_VALUE!!');
		//console.log(action.payload);
		return {...state, translateValue: action.payload};

	case SET_INDEX:
		//console.log('[Reducer] [albumSlide] SET_INDEX!!');
		//console.log(action.payload);
		return {...state, index:action.payload};

	default:
		break;
	}

	return state;
}
