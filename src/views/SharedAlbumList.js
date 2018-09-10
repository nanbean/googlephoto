import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlbumLists from '../components/AlbumLists';

import {
	clearAlbumItems,
	fetchGetSharedAlbumList
} from '../actions/albumActions';
import { fetchGetAuth } from '../actions/authActions';

export class SharedAlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetSharedAlbumList();
		this.props.clearAlbumItems();
	}

	render() {
		const { sharedAlbumList } = this.props;

		return (
			<div>
				<AlbumLists
					albumList={sharedAlbumList}
				/>
			</div>
		);
	}
}

SharedAlbumList.propTypes = {
	clearAlbumItems: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired,
	fetchGetSharedAlbumList: PropTypes.func.isRequired,
	sharedAlbumList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	sharedAlbumList: state.sharedAlbumList
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
