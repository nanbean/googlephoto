import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import PhotoLists from '../PhotoLists';

configure({adapter: new Adapter()});

describe('PhotoLists Test Cases', () => {
	const component = mount(
		<BrowserRouter>
			<PhotoLists
				albumItems={[
					{
						baseUrl: 'baseUrl1',
						id: 'id1',
						filename: 'filename1'
					},
					{
						baseUrl: 'baseUrl2',
						id: 'id2',
						filename: 'filename2'
					},
					{
						baseUrl: 'baseUrl3',
						id: 'id3',
						filename: 'filename3'
					}
				]}
			/>
		</BrowserRouter>
	);

	it('renders without crashing', () => {
		expect(component.find(PhotoLists)).toHaveLength(1);
	});

	it('should render proper PhotoItem', () => {
		expect(component.find('PhotoItem')).toHaveLength(3);
	});
});
