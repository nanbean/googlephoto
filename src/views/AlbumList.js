import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';

import AlbumLists from '../components/AlbumLists';

import {
	clearAlbumItems,
	fetchGetAlbumList
} from '../actions/albumActions';
import {fetchGetAuth} from '../actions/authActions';

export class AlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetAlbumList();
		this.props.clearAlbumItems();
	}

	render() {
		const {albums, fetching} = this.props;

		return (
			<div>
				<Loader active={fetching} size="huge"/>
				<AlbumLists
					albums={albums}
				/>
			</div>
		);
	}
}

AlbumList.propTypes = {
	albums: PropTypes.array.isRequired,
	clearAlbumItems: PropTypes.func.isRequired,
	fetchGetAlbumList: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	albums: state.albumList.albums,
	fetching: state.albumList.fetching
});

const mapDispatchToProps = dispatch => ({
	clearAlbumItems() {
		dispatch(clearAlbumItems());
	},
	fetchGetAlbumList() {
		dispatch(fetchGetAlbumList());
	},
	fetchGetAuth() {
		dispatch(fetchGetAuth());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumList);
