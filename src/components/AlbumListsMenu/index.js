import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Menu} from 'semantic-ui-react';

import './index.css';

class AlbumListsMenu extends Component {
	onClickHandler = (ev, comp) => {
		this.props.setAlbumListLayout(comp.name);
	}

	render() {
		const {layout} = this.props;

		return (
			<div className="album-lists-menu">
				<Menu pointing size="huge">
					<Menu.Item
						position="right"
						active={layout === 'block'}
						onClick={this.onClickHandler}
						name="block"
					>
						<Icon name="block layout" />
					</Menu.Item>
					<Menu.Item
						active={layout === 'grid'}
						onClick={this.onClickHandler}
						name="grid"
					>
						<Icon name="grid layout" />
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

AlbumListsMenu.propTypes = {
	layout: PropTypes.string.isRequired,
	setAlbumListLayout: PropTypes.func.isRequired
};

export default AlbumListsMenu;
