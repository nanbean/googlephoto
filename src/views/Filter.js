import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
		const { filter, filteredItems, filterList } = this.props;

		return (
			<div>
				<FilterSelector
					filter={filter}
					filterList={filterList}
					setFilter={this.props.setFilter}
					fetchGetFilteredItems={this.props.fetchGetFilteredItems}
				/>
				{
					filteredItems && filteredItems.length > 0 &&
					<PhotoLists
						albumItems={filteredItems}
					/>
				}
			</div>
		);
	}
}

Filter.propTypes = {
	fetchGetFilteredItems: PropTypes.func.isRequired,
	fetchGetFilterList: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	filteredItems: PropTypes.array.isRequired,
	filterList: PropTypes.array.isRequired,
	setFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	filter: state.filter,
	filterList: state.filterList,
	filteredItems: state.filteredItems.slice(0, 50)
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
