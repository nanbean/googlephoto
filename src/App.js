import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
	Album,
	AlbumList
} from './views';

import MenuBar from './components/MenuBar';

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
		const { auth, match } = this.props;

		return (
			<div className="App">
				<MenuBar
					auth={auth}
					match={match}
				/>
				<Routing />
			</div>
		);
	}
}

App.propTypes = {
	auth: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		url: PropTypes.string.isRequired
	})
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default withRouter(connect(
	mapStateToProps,
	null
)(App));
