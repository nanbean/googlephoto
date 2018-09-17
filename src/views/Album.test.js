import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Album} from './Album';

configure({adapter: new Adapter()});

describe('Album Test Cases', () => {
	const component = mount(
		<BrowserRouter>
			<Album
				fetchGetAlbumItems={() => {}}
				fetching={false}
				setAlbumId={() => {}}
				setAlbumTitle={() => {}}
				id="test id"
				title="test title"
				match={{params: {id: 'test id'}}}
				photos={[]}
				albums={[
					{
						id: 'test id',
						title: 'test title'
					}
				]}
			/>
		</BrowserRouter>
	);

	it('renders without crashing', () => {
		expect(component.find(Album)).toHaveLength(1);
	});

	it('HeaderContent should have proper album title', () => {
		const header = component.find('Header');
		expect(header.find('h2').at(0).text()).toBe('test title');
	});

	it('should not render Loader when fetching is false', () => {
		const loader = component.find('Loader');
		expect(loader.props().active).toBe(false);
	});

	it('should render Loader when fetching is true', () => {
		const component2 = mount(
			<BrowserRouter>
				<Album
					fetchGetAlbumItems={() => {}}
					fetching={true}
					setAlbumId={() => {}}
					setAlbumTitle={() => {}}
					id="test id"
					title="test title"
					match={{params: {id: 'test id'}}}
					photos={[]}
					albums={[
						{
							id: 'test id',
							title: 'test title'
						}
					]}
				/>
			</BrowserRouter>
		);
		const loader = component2.find('Loader');
		expect(loader.props().active).toBe(true);
	});
});
