import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

export class PhotoItem extends Component {
	handleClick = () => {
		// const { id } = this.props;

		// this.props.history.push(`/album/${id}`);
	}

	render () {
		const { baseUrl } = this.props;

		return (
			<Image
				src={baseUrl}
				onClick={this.handleClick}
			/>
		);
	}
}

PhotoItem.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	filename: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired
};

PhotoItem.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	})
};

export default withRouter(PhotoItem);
