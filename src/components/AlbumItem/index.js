import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './index.css';

export class AlbumItem extends Component {
	handleClick = () => {
		const { id } = this.props;

		this.props.history.push(`/album/${id}`);
	}

	render () {
		const { coverPhotoBaseUrl, title } = this.props;

		return (
			<div className="album-item">
				<div
					className="image"
					style={{backgroundImage: `url(${coverPhotoBaseUrl})`}}
					onClick={this.handleClick}
				/>
				<div className="title">{title}</div>
			</div>
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
