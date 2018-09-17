import {combineReducers} from 'redux';
import album from './album';
import albumList from './albumList';
import fullScreen from './fullScreen';

export default combineReducers({
	album,
	albumList,
	fullScreen
});
