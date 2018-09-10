import {combineReducers} from 'redux';
import albums from './albums';
import fetching from './fetching';

export default combineReducers({
	albums,
	fetching
});
