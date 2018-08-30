import { combineReducers } from 'redux';
import ui from './ui';
import albumList from './albumList';
import auth from './auth';

const photoFrame = combineReducers({
	ui,
	albumList,
	auth
});

export default photoFrame;
