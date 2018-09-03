import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PhotoItem} from '../PhotoItem';

configure({adapter: new Adapter()});

describe('PhotoItem Test Cases', () => {
	const component = mount(
		<PhotoItem
			baseUrl={'test'}
			id={'test'}
			title={'test'}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(PhotoItem)).toHaveLength(1);
	});

	it('should have proper image', () => {
		const image = component.find('Image');
		expect(image).toHaveLength(1);
		expect(image.props().src).toBe('test');
	});
});
