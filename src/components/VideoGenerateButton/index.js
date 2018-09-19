import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Icon
} from 'semantic-ui-react';

import './index.css';

export class VideoGenerateButton extends Component {
	onClickHandler = () => {
		const {id} = this.props;

		this.props.fetchGenerateVideo(id);
	}

	render () {
		return (
			<div className="video-generate-button">
				<Button
					size="massive"
					icon
					labelPosition="left"
					onClick={this.onClickHandler}
				>
					<Icon name="video" />
					Generate Video
				</Button>
			</div>
		);
	}
}

VideoGenerateButton.propTypes = {
	fetchGenerateVideo: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
};

export default VideoGenerateButton;
