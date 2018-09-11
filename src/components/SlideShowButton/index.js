import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Button,
	Icon
} from 'semantic-ui-react';

import './index.css';

export class SlideShowButton extends Component {
	render () {
		const { id } = this.props;

		return (
			<div className="slide-show-button">
				<Link
					to={`/albumslide/${id}`}
				>
					<Button icon labelPosition='left'>
						<Icon name='eye' />
						Slide Show
					</Button>
				</Link>
			</div>
		);
	}
}

SlideShowButton.propTypes = {
	id: PropTypes.string.isRequired
};

export default SlideShowButton;
