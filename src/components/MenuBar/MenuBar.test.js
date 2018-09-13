import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import MenuBar from '../MenuBar';

configure({adapter: new Adapter()});

describe('MenuBar Test Cases', () => {
	const component = mount(
		<BrowserRouter>
			<MenuBar
				auth={true}
				visible={true}
			/>
		</BrowserRouter>
	);

	it('renders without crashing', () => {
		expect(component.find(MenuBar)).toHaveLength(1);
	});

	it('should render proper MenuBar', () => {
		expect(component.find('MenuItem')).toHaveLength(3);
	});

	it('should render login', () => {
		const component2 = mount(
			<BrowserRouter>
				<MenuBar
					auth={false}
					visible={true}
				/>
			</BrowserRouter>
		);
		expect(component2.find('MenuItem')).toHaveLength(4);
	});

	it('should not render items when visible is false', () => {
		const component2 = mount(
			<BrowserRouter>
				<MenuBar
					auth={false}
					visible={false}
				/>
			</BrowserRouter>
		);
		expect(component2.find('MenuItem')).toHaveLength(0);
	});
});
