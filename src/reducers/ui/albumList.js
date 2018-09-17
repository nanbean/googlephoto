import {handleActions} from 'redux-actions';

import {
	setAlbumListLayout
} from '../../actions/ui/albumList';

const initialState = {
	layout: 'grid'
};

export default handleActions(
	{
		[setAlbumListLayout]: (state, {payload}) => ({
			...state,
			layout: payload
		})
	},
	initialState
);
