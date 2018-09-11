import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';

import {
	toggleSetting
} from '../actions/settingActions';

class SlideSettings extends Component {
	render() {
		const {
			visible,
			showDots,
			autoplay,
			toggleSetting
		} = this.props;

		//console.log('[Settings] rendering page..');

		if (!visible) {
			//console.log('[Settings] visible is not true! ' + visible);
			return null;
		}

		return (
			<div className="settings">
				<div className="menu">
					<div className="setting">
						<div className="text">Show Dots</div>
						<Switch
							onClick={() => toggleSetting('showDots')}
							on={showDots}
						/>
					</div>

					<div className="setting">
						<div className="text">Autoplay</div>
						<Switch
							onClick={() => toggleSetting('autoplay')}
							on={autoplay}
							data-setting="autoplay"
						/>
					</div>

					<div className="setting-close">
						<button
							onClick={() => toggleSetting('visible')}
							data-setting="visible"
						>
							Close Settings
						</button>
					</div>
				</div>
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

const mapStateToProps = ({ slideSettings }) => {
	//console.log('[Settings] mapStateToProps!');
	//console.log(JSON.stringify(slideSettings));
	return ({
		showDots: slideSettings.showDots,
		coolButtons: slideSettings.coolButtons
	});
};

const mapDispatchToProps = dispatch => ({
	toggleSetting: (params) => {
		dispatch(toggleSetting(params));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideSettings);
