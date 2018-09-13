import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide';

import './index.css';

export class SlideList extends Component {
	renderSlides = () => {
		const {photos} = this.props;

		if (!this.props.photos) {
			return;
		}

		return (
			photos.map((i) => {
				return (
					<Slide key={i} image={`${i.baseUrl}=w1920-h1080`} />
				);
			})
		);
	}

	render = () => {
		const {translateValue} = this.props;
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
