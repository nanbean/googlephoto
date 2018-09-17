import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import './index.css';

export class AlbumItem extends Component {
	handleClick = () => {
		const {id} = this.props;

		this.props.history.push(`/album/${id}`);
	}

	render () {
		const {coverPhotoBaseUrl, height, title, width} = this.props;

		return (
			<div className="album-item">
				<div
					className="image"
					style={{
						backgroundImage: `url(${coverPhotoBaseUrl})`,
						width: `${width}px`,
						height: `${height}px`
					}}
					onClick={this.handleClick}
				/>
				<div className="title">{title}</div>
			</div>
		);
	}
}

AlbumItem.propTypes = {
	coverPhotoBaseUrl: PropTypes.string.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	height: PropTypes.number,
	width: PropTypes.number
};

AlbumItem.defaultProps = {
	height: 250,
	width: 250
};

export default withRouter(AlbumItem);
