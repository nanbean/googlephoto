import { handleActions } from 'redux-actions';

import { setAlbumId } from '../../actions/ui/album';

const initialState = {};

export default handleActions(
	{
		[setAlbumId]: (state, { payload }) => ({
			...state,
			id: payload
		})
	},
	initialState
);
