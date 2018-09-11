import { combineReducers } from 'redux';
import ui from './ui';
import albumList from './albumList';
import albumItems from './albumItems';
import auth from './auth';
import sharedAlbumList from './sharedAlbumList';
import filter from './filter';
import filteredItems from './filteredItems';
import filterList from './filterList';

const photoFrame = combineReducers({
	ui,
	albumItems,
	albumList,
	auth,
	filter,
	filteredItems,
	filterList,
	sharedAlbumList
});

export default photoFrame;
