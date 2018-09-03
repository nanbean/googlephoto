import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AlbumList} from './AlbumList';

configure({adapter: new Adapter()});

describe('AlbumList Test Cases', () => {
	const component = mount(
		<AlbumList
			albumList={[]}
			auth={true}
			clearAlbumItems={() => {}}
			fetchGetAlbumList={() => {}}
			fetchGetAuth={() => {}}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find(AlbumList)).toHaveLength(1);
	});

	it('AlbumList should have proper AlbumLists', () => {
		const albumLists = component.find('AlbumLists');
		expect(albumLists).toHaveLength(1);
	});
});
