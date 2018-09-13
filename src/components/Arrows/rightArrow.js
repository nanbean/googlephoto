import React from 'react';
import PropTypes from 'prop-types';

import rightArrowImg from '../Img/slider-right-arrow.svg';

const RightArrow = ({ nextSlide, coolButtons }) => {
	return (
		<div className={coolButtons ? 'right-arrow cool-buttons' : 'right-arrow'} onClick={nextSlide}>
			<img src={rightArrowImg} alt="" />
		</div>
	);
};

RightArrow.propTypes = {
	coolButtons: PropTypes.bool,
	nextSlide: PropTypes.func
};

export default RightArrow;
