import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlbumLists from '../components/AlbumLists';

import {
	clearAlbumItems,
	fetchGetAlbumList
} from '../actions/albumActions';
import { fetchGetAuth } from '../actions/authActions';

export class AlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetAlbumList();
		this.props.clearAlbumItems();
	}

	render() {
		const { albumList } = this.props;

		return (
			<div>
				<AlbumLists
					albumList={albumList}
				/>
			</div>
		);
	}
}

AlbumList.propTypes = {
	albumList: PropTypes.array.isRequired,
	clearAlbumItems: PropTypes.func.isRequired,
	fetchGetAlbumList: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	albumList: state.albumList
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
