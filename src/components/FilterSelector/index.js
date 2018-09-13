import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'semantic-ui-react';

import './index.css';

class FilterSelector extends Component {
	onFilterChange = (e, data) => {
		this.props.setFilter(data.label);
		this.props.fetchGetFilteredItems(data.label);
	}

	render () {
		const {filter, filterList} = this.props;

		return (
			<div className="filter-list">
				{
					filterList && filterList.map(j => {
						return (
							<div className="filter-checkbox" key={j}>
								<Checkbox
									label={j}
									checked={j === filter}
									onChange={this.onFilterChange}/>
							</div>
						);
					})
				}
			</div>
		);
	}
}

FilterSelector.propTypes = {
	fetchGetFilteredItems: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	filterList: PropTypes.array.isRequired,
	setFilter: PropTypes.func.isRequired
};

export default FilterSelector;
