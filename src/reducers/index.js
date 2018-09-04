import { combineReducers } from 'redux';
import ui from './ui';
import albumList from './albumList';
import albumItems from './albumItems';
import auth from './auth';

const photoFrame = combineReducers({
	ui,
	albumItems,
	albumList,
	auth
});

export default photoFrame;
