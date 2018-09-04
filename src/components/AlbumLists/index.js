import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlbumItem from '../AlbumItem';

import './index.css';

class AlbumLists extends Component {
	render () {
		const { albumList } = this.props;

		return (
			<div className="album-lists">
				{
					albumList && albumList.map(i => {
						return (
							<AlbumItem
								key={i.id}
								coverPhotoBaseUrl={`${i.coverPhotoBaseUrl}=w500-h500`}
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
