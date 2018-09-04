import { createActions } from 'redux-actions';

export const {
	setAlbumId,
	setAlbumTitle
} = createActions(
	'SET_ALBUM_ID',
	'SET_ALBUM_TITLE'
);
