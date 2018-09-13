import { TOGGLE_SETTING } from './actionTypes';

export function toggleSetting(settingName) {
	return ({
		type: TOGGLE_SETTING,
		payload: settingName
	});
}
