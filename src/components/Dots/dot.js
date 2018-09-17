import React from 'react';
import PropTypes from 'prop-types';

const Dot = ({id, active, dotClick}) => {
	const names = active ? 'dot active' : 'dot';
	return (
		<div className={names} onClick={() => dotClick(id)} />
	);
};

Dot.propTypes = {
	active: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	dotClick: PropTypes.func
};

export default Dot;
