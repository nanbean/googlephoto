import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry
} from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';

import PhotoItem from '../PhotoItem';

const columnWidth = 300;
const defaultHeight = 300;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
	defaultHeight,
	defaultWidth,
	fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
	cellMeasurerCache: cache,
	columnCount: 6,
	columnWidth,
	spacer: 10
});

const MasonryComponent = ({ itemsWithSizes }) => {
	function cellRenderer({ index, key, parent, style }) {
		const { item, size } = itemsWithSizes[index];
		const height = columnWidth * (size.height / size.width) || defaultHeight;

		return (
			<CellMeasurer cache={cache} index={index} key={key} parent={parent}>
				<div style={style}>
					<PhotoItem
						baseUrl={`${item.baseUrl}`}
						id={item.id}
						filename={item.filename}
						height={height}
						width={columnWidth}
					/>
				</div>
			</CellMeasurer>
		);
	}

	cellRenderer.propTypes = {
		index: PropTypes.number.isRequired,
		key: PropTypes.string.isRequired,
		parent: PropTypes.object.isRequired,
		style: PropTypes.object.isRequired
	};

	return (
		<Masonry
			cellCount={itemsWithSizes.length}
			cellMeasurerCache={cache}
			cellPositioner={cellPositioner}
			cellRenderer={cellRenderer}
			height={900}
			width={1870}
		/>
	);
};

MasonryComponent.propTypes = {
	itemsWithSizes: PropTypes.array.isRequired
};

class PhotoLists extends Component {
	componentWillUnmount () {
		cache.clearAll();
		cellPositioner.reset({
			columnCount: 6,
			columnWidth,
			spacer: 10
		});
	}

	cellRenderer = ({ index, key, parent, style }) => {
		const { albumItems } = this.props;
		const datum = albumItems[index];

		return (
			<CellMeasurer
				cache={cache}
				index={index}
				key={key}
				parent={parent}
			>
				<div style={style}>
					<PhotoItem
						key={datum.id}
						baseUrl={`${datum.baseUrl}`}
						id={datum.id}
						filename={datum.filename}
						height={datum.height}
						width={datum.width}
					/>
				</div>
			</CellMeasurer>
		);
	}

	render () {
		const { albumItems } = this.props;

		return (
			<div className="album-lists">
				{
					albumItems && albumItems.length > 0 &&
					<ImageMeasurer
						items={albumItems}
						image={item => {
							return item.baseUrl;
						}}
						defaultHeight={defaultHeight}
						defaultWidth={defaultWidth}
					>
						{({ itemsWithSizes }) => {
							return <MasonryComponent itemsWithSizes={itemsWithSizes} />;
						}}
					</ImageMeasurer>
				}
			</div>
		);
	}
}

PhotoLists.propTypes = {
	albumItems: PropTypes.array.isRequired
};

export default PhotoLists;
