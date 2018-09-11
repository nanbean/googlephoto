import React from 'react';
import PropTypes from 'prop-types';

import Dot from './dot';

const Dots = ( { index, images, dotClick, visible } ) => {

	if (!visible) {
		return null;
	}

	const dotsGroup = images.map((image, i) => {
		let active = (i === index) ? true : false;
		return (
			<Dot
				key={i}
				id={i}
				active={active}
				dotClick={dotClick}
			/>
		);
	});

	return (
		<div className="dots-container">
			{dotsGroup}
		</div>
	);
};

Dots.propTypes = {
	images: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	visible: PropTypes.bool.isRequired,
	dotClick: PropTypes.func
};

export default Dots;
