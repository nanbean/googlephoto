import React from 'react';
import PropTypes from 'prop-types';

import {
	Button
} from 'semantic-ui-react';

import './index.css';

const ToggleSettings = ({ visible, toggleSetting }) => (
	<div className="slide-setting-button">
		<Button
			icon={visible ? 'close' : 'setting'}
			onClick={() => toggleSetting('visible')}
		/>
	</div>
);

ToggleSettings.propTypes = {
	toggleSetting: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default ToggleSettings;
