import { handleActions } from 'redux-actions';

import {
	setAlbumId,
	setAlbumTitle
} from '../../actions/ui/album';

const initialState = {
	id: ''
};

export default handleActions(
	{
		[setAlbumId]: (state, { payload }) => ({
			...state,
			id: payload
		}),
		[setAlbumTitle]: (state, { payload }) => ({
			...state,
			title: payload
		})
	},
	initialState
);
