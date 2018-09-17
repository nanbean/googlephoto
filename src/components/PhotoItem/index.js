import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

export class PhotoItem extends Component {
	handleClick = () => {
		// const {id} = this.props;

		// this.props.history.push(`/album/${id}`);
	}

	render () {
		const {baseUrl, filename, height, width} = this.props;

		return (
			<img
				alt={filename}
				src={baseUrl}
				style={{
					height: height,
					width: width
				}}
				onClick={this.handleClick}
			/>
		);
	}
}

PhotoItem.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	filename: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired
};

PhotoItem.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	})
};

export default withRouter(PhotoItem);
