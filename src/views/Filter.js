import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import PhotoLists from '../components/PhotoLists';
import FilterSelector from '../components/FilterSelector';

import {
	fetchGetFilteredItems,
	fetchGetFilterList,
	setFilter
} from '../actions/fitlerActions';

export class Filter extends Component {
	componentDidMount () {
		this.props.fetchGetFilterList();
	}

	render() {
		const { fetching, filter, photos, filterList } = this.props;

		return (
			<div>
				<FilterSelector
					filter={filter}
					filterList={filterList}
					setFilter={this.props.setFilter}
					fetchGetFilteredItems={this.props.fetchGetFilteredItems}
				/>
				<Loader active={fetching} size="huge"/>
				{
					photos && photos.length > 0 &&
					<PhotoLists
						photos={photos}
					/>
				}
			</div>
		);
	}
}

Filter.propTypes = {
	fetchGetFilteredItems: PropTypes.func.isRequired,
	fetchGetFilterList: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired,
	filter: PropTypes.string.isRequired,
	filterList: PropTypes.array.isRequired,
	photos: PropTypes.array.isRequired,
	setFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	fetching: state.filteredItems.fetching,
	filter: state.filter,
	filterList: state.filterList,
	photos: state.filteredItems.photos.slice(0, 50)
});

const mapDispatchToProps = dispatch => ({
	fetchGetFilteredItems (params) {
		dispatch(fetchGetFilteredItems(params));
	},
	fetchGetFilterList () {
		dispatch(fetchGetFilterList());
	},
	setFilter (params) {
		dispatch(setFilter(params));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter);
