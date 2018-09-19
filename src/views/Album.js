import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
	Header,
	Loader
} from 'semantic-ui-react';

import PhotoLists from '../components/PhotoLists';
import SlideShowButton from '../components/SlideShowButton';
import VideoGenerateButton from '../components/VideoGenerateButton';

import {
	setAlbumId,
	setAlbumTitle
} from '../actions/ui/album';
import {fetchGetAlbumItems} from '../actions/albumActions';
import {fetchGenerateVideo} from '../actions/videoGenerateActions';

export class Album extends Component {
	componentDidMount() {
		const {albums, match} = this.props;
		const id = match && match.params && match.params.id;
		const album = albums && albums.find(i => i.id === id);
		const title = album && album.title;

		this.props.setAlbumId(id);
		title && this.props.setAlbumTitle(title);
		this.props.fetchGetAlbumItems(id);
	}

	render() {
		const {fetching, id, photos, title} = this.props;

		return (
			<div>
				<div>
					<Loader active={fetching} size="huge"/>
					<Header as="h2" textAlign="center">
						{title}
					</Header>
					<VideoGenerateButton
						id={id}
						fetchGenerateVideo={this.props.fetchGenerateVideo}
					/>
					<SlideShowButton id={id} />
				</div>
				<PhotoLists
					photos={photos}
				/>
			</div>
		);
	}
}

Album.propTypes = {
	albums: PropTypes.array.isRequired,
	fetchGenerateVideo: PropTypes.func.isRequired,
	fetchGetAlbumItems: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	photos: PropTypes.array.isRequired,
	setAlbumId: PropTypes.func.isRequired,
	setAlbumTitle: PropTypes.func.isRequired,
	title: PropTypes.string
};

const mapStateToProps = state => ({
	albums: state.albumList.albums,
	fetching: state.albumItems.fetching,
	id: state.ui.album.id,
	photos: state.albumItems.photos,
	title: state.ui.album.title
});

const mapDispatchToProps = dispatch => ({
	fetchGenerateVideo(params) {
		dispatch(fetchGenerateVideo(params));
	},
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
