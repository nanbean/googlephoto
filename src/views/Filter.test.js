import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Filter} from './Filter';

configure({adapter: new Adapter()});

describe('Filter Test Cases', () => {
	const component = mount(
		<Filter
			photos={[]}
			fetchGetFilteredItems={() => {}}
			fetchGetFilterList={() => {}}
			fetching={false}
			filter={''}
			filterList={['a', 'b', 'c']}
			setFilter={() => {}}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(Filter)).toHaveLength(1);
	});
});
