import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
	Album,
	AlbumList
} from './views';

import './App.css';

const Routing = () => (
	<Switch>
		<Route exact path="/albumlist" component={AlbumList} />
		<Route path="/album/:id" component={Album} />
		<Redirect from="/" to="/albumlist"/>
	</Switch>
);

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Routing />
			</div>
		);
	}
}

export default withRouter(connect(
	null,
	null
)(App));
