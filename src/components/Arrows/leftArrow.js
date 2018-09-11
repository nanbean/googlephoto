import React from 'react';
import PropTypes from 'prop-types';

import leftArrowImg from '../Img/slider-left-arrow.svg';

const LeftArrow = ({ prevSlide, coolButtons }) => {
	return (
		<div className={coolButtons ? 'left-arrow cool-buttons' : 'left-arrow'} onClick={prevSlide}>
			<img src={leftArrowImg} alt="" />
		</div>
	);
};

LeftArrow.propTypes = {
	coolButtons: PropTypes.bool,
	prevSlide: PropTypes.func
};

export default LeftArrow;
