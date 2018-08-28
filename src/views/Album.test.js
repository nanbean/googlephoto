import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Album} from './Album';

configure({adapter: new Adapter()});

describe('Album Test Cases', () => {
	const component = mount(
		<Album setAlbumId={() => {}} id="test" match={{params: {id: 'test'}}}/>
	);

	it('renders without crashing', () => {
		expect(component.find(Album)).toHaveLength(1);
	});

	it('HeaderSubheader should have proper album id', () => {
		const headerSubheader = component.find('HeaderSubheader');
		expect(headerSubheader.text()).toBe('test');
	});
});
