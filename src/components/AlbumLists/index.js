import React, {Component} from 'react';
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

const cacheBlock = new CellMeasurerCache({
	defaultHeight: 350,
	defaultWidth: 400,
	fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
	cellMeasurerCache: cache,
	columnCount: 6,
	columnWidth: 300,
	spacer: 10
});

const cellPositionerBlock = createMasonryCellPositioner({
	cellMeasurerCache: cacheBlock,
	columnCount: 4,
	columnWidth: 460,
	spacer: 10
});

export class AlbumListsGrid extends Component {
	componentWillUnmount () {
		cache.clearAll();
		cellPositioner.reset({
			columnCount: 6,
			columnWidth: 300,
			spacer: 10
		});
	}

	cellRenderer = ({index, key, parent, style}) => {
		const {albums} = this.props;
		const datum = albums[index];

		return (
			<CellMeasurer
				cache={cache}
				index={index}
				key={key}
				parent={parent}
			>
				<div style={style}>
					<AlbumItem
						coverPhotoBaseUrl={`${datum.coverPhotoBaseUrl}=w500-h500`}
						id={datum.id}
						title={datum.title}
					/>
				</div>
			</CellMeasurer>
		);
	}

	render () {
		const {albums} = this.props;

		return (
			<div className="album-lists">
				{
					albums && albums.length > 0 &&
					<Masonry
						cellCount={albums.length}
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

AlbumListsGrid.propTypes = {
	albums: PropTypes.array.isRequired
};

export class AlbumListsBlock extends Component {
	componentWillUnmount () {
		cacheBlock.clearAll();
		cellPositionerBlock.reset({
			columnCount: 4,
			columnWidth: 460,
			spacer: 10
		});
	}

	cellRenderer = ({index, key, parent, style}) => {
		const {albums} = this.props;
		const datum = albums[index];

		return (
			<CellMeasurer
				cache={cacheBlock}
				index={index}
				key={key}
				parent={parent}
			>
				<div style={style}>
					<AlbumItem
						coverPhotoBaseUrl={`${datum.coverPhotoBaseUrl}=w800-h800`}
						id={datum.id}
						title={datum.title}
						height={400}
						width={400}
					/>
				</div>
			</CellMeasurer>
		);
	}

	render () {
		const {albums} = this.props;

		return (
			<div className="album-lists">
				{
					albums && albums.length > 0 &&
					<Masonry
						cellCount={albums.length}
						cellMeasurerCache={cacheBlock}
						cellPositioner={cellPositionerBlock}
						cellRenderer={this.cellRenderer}
						height={900}
						width={1870}
					/>
				}
			</div>
		);
	}
}

AlbumListsBlock.propTypes = {
	albums: PropTypes.array.isRequired
};

export default AlbumListsGrid;
