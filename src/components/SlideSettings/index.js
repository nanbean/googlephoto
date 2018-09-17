import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	Checkbox,
	Segment
} from 'semantic-ui-react';

import './index.css';

class SlideSettings extends Component {
	render() {
		const {
			visible,
			showDots,
			autoplay,
			toggleSetting
		} = this.props;

		if (!visible) {
			return null;
		}

		return (
			<div className="slide-setting">
				<Segment>
					<div className="item">
						<Checkbox
							toggle
							onClick={() => toggleSetting('showDots')}
							checked={showDots}
							label="Show Dots"
						/>
					</div>
					<div className="item">
						<Checkbox
							toggle
							onClick={() => toggleSetting('autoplay')}
							checked={autoplay}
							label="Auto Play"
						/>
					</div>
				</Segment>
			</div>
		);
	}
}

SlideSettings.propTypes = {
	autoplay: PropTypes.bool.isRequired,
	showDots: PropTypes.bool.isRequired,
	toggleSetting: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
};

export default SlideSettings;
