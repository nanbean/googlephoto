import { combineReducers } from 'redux';
import ui from './ui';
import albumList from './albumList';

const photoFrame = combineReducers({
	ui,
	albumList
});

export default photoFrame;
