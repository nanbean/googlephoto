import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import './index.css';

const userRoutes = [
	{
		path: '/albumlist',
		label: 'Album List',
		icon: 'picture'
	},
	{
		path: '/sharedalbumlist',
		label: 'Shared Album List',
		icon: 'share alternate'
	},
	{
		path: '/filter',
		label: 'Filter',
		icon: 'filter'
	}
];

const MenuBar = ({
	auth
}) => (
	<div>
		<Menu pointing size="massive">
			{
				userRoutes.map(route => (
					<Route
						key={route.path}
						exact={route.exact}
						path={route.path}
						children={({ match }) => { // eslint-disable-line react/no-children-prop
							return (
								<Menu.Item
									as={Link}
									to={route.path}
									active={!!match}
								>
									<Icon name={route.icon} />
									{route.label}
								</Menu.Item>
							);
						}}
					/>
				))
			}
			{
				!auth &&
				<Menu.Item
					onClick={() => {
						window.location='/login';
					}}
				>
					<Icon name="user circle outline" />
					Log In
				</Menu.Item>
			}
		</Menu>
	</div>
);

MenuBar.propTypes = {
	auth: PropTypes.bool,
	match: PropTypes.shape({
		url: PropTypes.string.isRequired
	})
};

export default MenuBar;
