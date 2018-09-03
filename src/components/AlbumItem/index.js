import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

export class AlbumItem extends Component {
	handleClick = () => {
		const { id } = this.props;

		this.props.history.push(`/album/${id}`);
	}

	render () {
		const { coverPhotoBaseUrl } = this.props;

		return (
			<Image
				src={coverPhotoBaseUrl}
				onClick={this.handleClick}
			/>
		);
	}
}

AlbumItem.propTypes = {
	coverPhotoBaseUrl: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

AlbumItem.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	})
};

export default withRouter(AlbumItem);
