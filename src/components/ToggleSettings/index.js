import React from 'react';
import PropTypes from 'prop-types';

import closeImg from '../Img/settings-close.svg';
import gearIcon from '../Img/settings.svg';

const ToggleSettings = ({ visible, toggleSetting }) => (
	<img
		src={visible ? closeImg : gearIcon}
		alt=""
		className="settings-icon"
		onClick={() => toggleSetting('visible')}
	/>
);

ToggleSettings.propTypes = {
	toggleSetting: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default ToggleSettings;
