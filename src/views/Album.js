import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import PhotoLists from '../components/PhotoLists';

import {
	setAlbumId,
	setAlbumTitle
} from '../actions/ui/album';
import { fetchGetAlbumItems } from '../actions/albumActions';

export class Album extends Component {
	componentDidMount() {
		const { albumList, match } = this.props;
		const id = match && match.params && match.params.id;
		const album = albumList && albumList.find(i => i.id === id);
		const title = album && album.title;

		this.props.setAlbumId(id);
		title && this.props.setAlbumTitle(title);
		this.props.fetchGetAlbumItems(id);
	}

	render() {
		const { albumItems, id, title } = this.props;

		return (
			<div>
				<Header as="h2" textAlign="center">
					<Header.Content>
						{title}
						<Header.Subheader>{id}</Header.Subheader>
					</Header.Content>
				</Header>
				<PhotoLists
					albumItems={albumItems}
				/>
			</div>
		);
	}
}

Album.propTypes = {
	albumItems: PropTypes.array.isRequired,
	albumList: PropTypes.array.isRequired,
	fetchGetAlbumItems: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	setAlbumId: PropTypes.func.isRequired,
	setAlbumTitle: PropTypes.func.isRequired,
	title: PropTypes.string
};

const mapStateToProps = state => ({
	albumItems: state.albumItems,
	albumList: state.albumList,
	id: state.ui.album.id,
	title: state.ui.album.title
});

const mapDispatchToProps = dispatch => ({
	fetchGetAlbumItems(params) {
		dispatch(fetchGetAlbumItems(params));
	},
	setAlbumId(params) {
		dispatch(setAlbumId(params));
	},
	setAlbumTitle(params) {
		dispatch(setAlbumTitle(params));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Album);
