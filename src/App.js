import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router-dom';

import {
	Album,
	AlbumList,
	Filter,
	SharedAlbumList,
	AlbumSlide
} from './views';

import MenuBar from './components/MenuBar';

import {setCursorState} from './actions/webOSActions';

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
	constructor (props) {
		super(props);

		if (typeof document !== 'undefined') {
			const that = this;
			document.addEventListener('cursorStateChange', function (oEvent) {
				that.props.dispatch(setCursorState(oEvent.detail.visibility));
			}, false);

			document.addEventListener('webOSRelaunch', function (oEvent) {
				that.setPath(oEvent.detail);
			}, false);
		}
	}

	setPath = (param) => {
		let launchParams = param || {};

		if (launchParams.albumId) {
			this.props.history.push(`/albumslide/${launchParams.albumId}`);
		}
	}

	render() {
		const {auth, fullScreen} = this.props;

		return (
			<div className="App">
				<MenuBar
					auth={auth}
					visible={!fullScreen}
				/>
				<Routing />
			</div>
		);
	}
}

App.propTypes = {
	auth: PropTypes.bool.isRequired,
	fullScreen: PropTypes.bool.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	fullScreen: state.ui.fullScreen
});

export default withRouter(connect(
	mapStateToProps,
	null
)(App));
