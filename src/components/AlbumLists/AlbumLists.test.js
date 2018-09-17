import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import AlbumLists from '../AlbumLists';

configure({adapter: new Adapter()});

describe('AlbumLists Test Cases', () => {
	const component = mount(
		<BrowserRouter>
			<AlbumLists
				albums={[
					{
						coverPhotoBaseUrl: 'coverPhotoBaseUrl1',
						id: 'id1',
						title: 'title1'
					},
					{
						coverPhotoBaseUrl: 'coverPhotoBaseUrl2',
						id: 'id2',
						title: 'title3'
					},
					{
						coverPhotoBaseUrl: 'coverPhotoBaseUrl3',
						id: 'id3',
						title: 'title3'
					}
				]}
			/>
		</BrowserRouter>
	);

	it('renders without crashing', () => {
		expect(component.find(AlbumLists)).toHaveLength(1);
	});

	it('should render proper AlbumItem', () => {
		expect(component.find('AlbumItem')).toHaveLength(3);
	});
});
