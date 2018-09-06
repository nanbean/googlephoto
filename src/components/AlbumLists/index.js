import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry
} from 'react-virtualized';

import AlbumItem from '../AlbumItem';

import './index.css';

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
	defaultHeight: 250,
	defaultWidth: 300,
	fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
	cellMeasurerCache: cache,
	columnCount: 6,
	columnWidth: 300,
	spacer: 10
});

class AlbumLists extends Component {
	componentWillUnmount () {
		cache.clearAll();
		cellPositioner.reset({
			columnCount: 6,
			columnWidth: 300,
			spacer: 10
		});
	}

	cellRenderer = ({ index, key, parent, style }) => {
		const { albumList } = this.props;
		const datum = albumList[index];

		return (
			<CellMeasurer
				cache={cache}
				index={index}
				key={key}
				parent={parent}
			>
				<div style={style}>
					<AlbumItem
						key={datum.id}
						coverPhotoBaseUrl={`${datum.coverPhotoBaseUrl}=w500-h500`}
						id={datum.id}
						title={datum.title}
					/>
				</div>
			</CellMeasurer>
		);
	}

	render () {
		const { albumList } = this.props;

		return (
			<div className="album-lists">
				{
					albumList.length > 0 &&
					<Masonry
						cellCount={albumList.length}
						cellMeasurerCache={cache}
						cellPositioner={cellPositioner}
						cellRenderer={this.cellRenderer}
						height={900}
						width={1870}
					/>
				}
			</div>
		);
	}
}

AlbumLists.propTypes = {
	albumList: PropTypes.array.isRequired
};

export default AlbumLists;
