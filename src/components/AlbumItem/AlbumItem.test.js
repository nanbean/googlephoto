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
			title={'test title'}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(AlbumItem)).toHaveLength(1);
	});

	it('should have proper image', () => {
		const image = component.find('div').at(1);
		expect(image).toHaveLength(1);
		expect(image.props().style.backgroundImage).toBe('url(test)');
	});

	it('should have proper title', () => {
		const title = component.find('div').at(2);
		expect(title).toHaveLength(1);
		expect(title.text()).toBe('test title');
	});
});
