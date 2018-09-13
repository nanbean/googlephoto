import { combineReducers } from 'redux';
import album from './album';
import fullScreen from './fullScreen';

export default combineReducers({
	album,
	fullScreen
});
