import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlbumItem from '../AlbumItem';

class AlbumLists extends Component {
	render () {
		const { albumList } = this.props;

		return (
			<div>
				{
					albumList && albumList.map(i => {
						return (
							<AlbumItem
								key={i.id}
								coverPhotoBaseUrl={`${i.coverPhotoBaseUrl}=w200-h200`}
								id={i.id}
								title={i.title}
							/>
						);
					})
				}
			</div>
		);
	}
}

AlbumLists.propTypes = {
	albumList: PropTypes.array.isRequired
};

export default AlbumLists;
