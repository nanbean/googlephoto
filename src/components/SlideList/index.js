import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide';

export class SlideList extends Component {
	renderSlides = () => {
		//console.log('[SlideList] renderSlides');

		const { photos } = this.props;

		if (!this.props.photos) {
			return;
		}

		return (
			photos.map((curr, i) => {
				let baseUrl = photos[i].baseUrl;
				let w = photos[i].mediaMetadata.width;
				let h = photos[i].mediaMetadata.height;
				let infoSize = '';
				if (w && h) {
					infoSize = `=w${w}-h${h}`;
				}

				return (
					<Slide key={i} image={baseUrl.concat(infoSize)} />
				);
			})
		);
	}

	render = () => {
		const { translateValue } = this.props;
		return (
			<div className="slider-wrapper"
				style={{
					transform: `translateX(${translateValue}px)`,
					transition: 'transform ease-out 0.45s'
				}}>
				{
					this.renderSlides()
				}
			</div>
		);
	}
}

SlideList.propTypes = {
	photos: PropTypes.array.isRequired,
	translateValue: PropTypes.number.isRequired
};

export default SlideList;
