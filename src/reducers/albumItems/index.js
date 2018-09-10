import {combineReducers} from 'redux';
import fetching from './fetching';
import photos from './photos';

export default combineReducers({
	fetching,
	photos
});
