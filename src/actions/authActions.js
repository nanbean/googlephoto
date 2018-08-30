import * as types from './actionTypes';

const fetchGetAuthRequest = () => ({
	type: types.FETCH_GET_AUTH_REQUEST
});

export const fetchGetAuthSuccess = body => ({
	type: types.FETCH_GET_AUTH_SUCCESS,
	body
});

export const fetchGetAuthFailure = ex => ({
	type: types.FETCH_GET_AUTH_FAILURE,
	ex
});

export const fetchGetAuth = () => dispatch => {
	const apiUrl = '/getAuth';

	dispatch(fetchGetAuthRequest());
	return fetch(apiUrl)
		.then(res => res.json())
		.then(body => dispatch(fetchGetAuthSuccess(body)))
		.catch(ex => dispatch(fetchGetAuthFailure(ex)));
};
