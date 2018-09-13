import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.css';

class Slide extends Component {
	render () {
		const {image} = this.props;

		return (
			<div
				className="slide-item"
				style={{backgroundImage: `url(${image})`}}
			>
			</div>
		);
	}
}

Slide.propTypes = {
	height: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired
};

export default Slide;
