import * as types from './actionTypes';

const fetchGetFilterListRequest = () => ({
	type: types.FETCH_GET_FILTER_LIST_REQUEST
});

export const fetchGetFilterListSuccess = body => ({
	type: types.FETCH_GET_FILTER_LIST_SUCCESS,
	body
});

export const fetchGetFilterListFailure = ex => ({
	type: types.FETCH_GET_FILTER_LIST_FAILURE,
	ex
});

export const fetchGetFilterList = () => dispatch => {
	const apiUrl = '/photo/getFilterList';

	dispatch(fetchGetFilterListRequest());
	return fetch(apiUrl)
		.then(res => res.json())
		.then(body => dispatch(fetchGetFilterListSuccess(body)))
		.catch(ex => dispatch(fetchGetFilterListFailure(ex)));

};

export const clearFilteredItems = ex => ({
	type: types.CLEAR_FILTERED_ITEMS,
	ex
});

const fetchGetFilteredItemsRequest = () => ({
	type: types.FETCH_GET_FILTERED_ITEMS_REQUEST
});

export const fetchGetFilteredItemsSuccess = body => ({
	type: types.FETCH_GET_FILTERED_ITEMS_SUCCESS,
	body
});

export const fetchGetFilteredItemsFailure = ex => ({
	type: types.FETCH_GET_FILTERED_ITEMS_FAILURE,
	ex
});

export const fetchGetFilteredItems = (filter) => dispatch => {
	if (filter) {
		const apiUrl = '/photo/search';

		dispatch(clearFilteredItems());
		dispatch(fetchGetFilteredItemsRequest());
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				filters: [filter]
			})
		})
			.then(res => res.json())
			.then(body => dispatch(fetchGetFilteredItemsSuccess(body)))
			.catch(ex => dispatch(fetchGetFilteredItemsFailure(ex)));
	}
};

export const setFilter = filter => ({
	type: types.SET_FILTER,
	filter
});
