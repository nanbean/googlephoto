import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { fetchGetAlbumList } from '../actions/albumActions';

export class AlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAlbumList();
	}

	render() {
		return (
			<div>
				<Header as="h2" textAlign="center">
					<Header.Content>
						Album List
					</Header.Content>
				</Header>
			</div>
		);
	}
}

AlbumList.propTypes = {
	albumList: PropTypes.array.isRequired,
	fetchGetAlbumList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	albumList: state.albumList
});

const mapDispatchToProps = dispatch => ({
	fetchGetAlbumList() {
		dispatch(fetchGetAlbumList());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumList);
