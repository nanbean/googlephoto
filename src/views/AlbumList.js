import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import AlbumLists from '../components/AlbumLists';

import { fetchGetAlbumList } from '../actions/albumActions';
import { fetchGetAuth } from '../actions/authActions';

const Button = () => (
	<button
		type="button"
		onClick={() => {
			window.location='/login';
		}}
	>
		Log In
	</button>
);

export class AlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetAlbumList();
	}

	render() {
		const { albumList, auth } = this.props;

		return (
			<div>
				<Header as="h2" textAlign="center">
					<Header.Content>
						Album List
					</Header.Content>
				</Header>
				<AlbumLists
					albumList={albumList}
				/>
				{!auth &&
					<Button />
				}
			</div>
		);
	}
}

AlbumList.propTypes = {
	albumList: PropTypes.array.isRequired,
	auth: PropTypes.bool.isRequired,
	fetchGetAlbumList: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	albumList: state.albumList,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
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
