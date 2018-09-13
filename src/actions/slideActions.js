import {
	SET_TRANSLATE_VALUE,
	SET_INDEX,
	TOGGLE_AUTOPLAY
} from './actionTypes';

export const setTranslateValue = value => ({
	type: SET_TRANSLATE_VALUE,
	payload: value
});

export function setIndex(value) {
	//console.log('setIndex:' + value);
	return ({
		type: SET_INDEX,
		payload: value
	});
}

export function toggleAutoplay(isActive) {
	return ({
		type: TOGGLE_AUTOPLAY,
		payload: isActive
	});
}
