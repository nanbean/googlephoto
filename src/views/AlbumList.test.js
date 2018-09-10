import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AlbumList} from './AlbumList';

configure({adapter: new Adapter()});

describe('AlbumList Test Cases', () => {
	const component = mount(
		<AlbumList
			albums={[]}
			auth={true}
			clearAlbumItems={() => {}}
			fetchGetAlbumList={() => {}}
			fetchGetAuth={() => {}}
			fetching={false}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(AlbumList)).toHaveLength(1);
	});

	it('should have proper AlbumLists', () => {
		const albumLists = component.find('AlbumLists');
		expect(albumLists).toHaveLength(1);
	});

	it('should not render Loader when fetching is false', () => {
		const loader = component.find('Loader');
		expect(loader.props().active).toBe(false);
	});

	it('should render Loader when fetching is true', () => {
		const component2 = mount(
			<AlbumList
				albums={[]}
				auth={true}
				clearAlbumItems={() => {}}
				fetchGetAlbumList={() => {}}
				fetchGetAuth={() => {}}
				fetching={true}
			/>
		);
		const loader = component2.find('Loader');
		expect(loader.props().active).toBe(true);
	});
});
