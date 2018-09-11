import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Button,
	Icon
} from 'semantic-ui-react';

import './index.css';

export class SlideExitButton extends Component {
	render () {
		const { id } = this.props;

		return (
			<div className="slide-exit-button">
				<Link
					to={`/album/${id}`}
				>
					<Button icon labelPosition='left'>
						<Icon name='stop' />
						Exit
					</Button>
				</Link>
			</div>
		);
	}
}

SlideExitButton.propTypes = {
	id: PropTypes.string.isRequired
};

export default SlideExitButton;
