import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

class AlbumItem extends Component {
	render () {
		const { coverPhotoBaseUrl } = this.props;

		return (
			<Image src={coverPhotoBaseUrl} />
		);
	}
}

AlbumItem.propTypes = {
	coverPhotoBaseUrl: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export default AlbumItem;
