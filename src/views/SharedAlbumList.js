import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';

import AlbumLists from '../components/AlbumLists';

import {
	clearAlbumItems,
	fetchGetSharedAlbumList
} from '../actions/albumActions';
import {fetchGetAuth} from '../actions/authActions';

export class SharedAlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetSharedAlbumList();
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

SharedAlbumList.propTypes = {
	albums: PropTypes.array.isRequired,
	clearAlbumItems: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired,
	fetchGetSharedAlbumList: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	albums: state.sharedAlbumList.albums,
	fetching: state.sharedAlbumList.fetching
});

const mapDispatchToProps = dispatch => ({
	clearAlbumItems() {
		dispatch(clearAlbumItems());
	},
	fetchGetSharedAlbumList() {
		dispatch(fetchGetSharedAlbumList());
	},
	fetchGetAuth() {
		dispatch(fetchGetAuth());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SharedAlbumList);
