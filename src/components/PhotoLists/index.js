import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry
} from 'react-virtualized';

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

const MasonryComponent = ({photos}) => {
	function cellRenderer({index, key, parent, style}) {
		const item = photos[index];
		const {mediaMetadata} = item;
		const height = mediaMetadata && columnWidth * (mediaMetadata.height / mediaMetadata.width) || defaultHeight;

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
			cellCount={photos.length}
			cellMeasurerCache={cache}
			cellPositioner={cellPositioner}
			cellRenderer={cellRenderer}
			height={900}
			width={1870}
		/>
	);
};

MasonryComponent.propTypes = {
	photos: PropTypes.array.isRequired
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

	cellRenderer = ({index, key, parent, style}) => {
		const {photos} = this.props;
		const datum = photos[index];

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
		const {photos} = this.props;

		if (photos && photos.length === 0) {
			cache.clearAll();
			cellPositioner.reset({
				columnCount: 6,
				columnWidth,
				spacer: 10
			});
		}

		return (
			<div className="album-lists">
				{
					photos && photos.length > 0 &&
					<MasonryComponent photos={photos} />
				}
			</div>
		);
	}
}

PhotoLists.propTypes = {
	photos: PropTypes.array.isRequired
};

export default PhotoLists;
