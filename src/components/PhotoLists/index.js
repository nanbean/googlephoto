import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PhotoItem from '../PhotoItem';

class PhotoLists extends Component {
	render () {
		const { albumItems } = this.props;

		return (
			<div>
				{
					albumItems && albumItems.map(i => {
						return (
							<PhotoItem
								key={i.id}
								baseUrl={`${i.baseUrl}`}
								id={i.id}
								filename={i.filename}
							/>
						);
					})
				}
			</div>
		);
	}
}

PhotoLists.propTypes = {
	albumItems: PropTypes.array.isRequired
};

export default PhotoLists;
