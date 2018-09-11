import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
	Album,
	AlbumList,
	Filter,
	SharedAlbumList,
	AlbumSlide
} from './views';

import MenuBar from './components/MenuBar';

import './App.css';

const Routing = () => (
	<Switch>
		<Route exact path="/albumlist" component={AlbumList} />
		<Route exact path="/filter" component={Filter} />
		<Route exact path="/sharedalbumlist" component={SharedAlbumList} />
		<Route exact path="/albumslide/:id" component={AlbumSlide} />
		<Route path="/album/:id" component={Album} />
		<Redirect from="/" to="/albumlist"/>
	</Switch>
);

class App extends React.Component {
	render() {
		const { auth, match, location } = this.props;

		if (location.pathname.indexOf('albumslide') !== -1) {
			return (
				<div className="App">
					<Routing />
				</div>
			);
		}
		else {
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
