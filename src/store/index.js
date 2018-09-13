import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import photoFrame from '../reducers';

export default function configureStore (initialState) {
	const store = createStore(
		photoFrame,
		initialState,
		applyMiddleware(thunkMiddleware) // lets us dispatch functions
	);
	return store;
}
