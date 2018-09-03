import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AlbumItem} from '../AlbumItem';

configure({adapter: new Adapter()});

describe('AlbumItem Test Cases', () => {
	const component = mount(
		<AlbumItem
			coverPhotoBaseUrl={'test'}
			id={'test'}
			title={'test'}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(AlbumItem)).toHaveLength(1);
	});

	it('should have proper image', () => {
		const image = component.find('Image');
		expect(image).toHaveLength(1);
		expect(image.props().src).toBe('test');
	});
});
