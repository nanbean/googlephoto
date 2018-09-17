import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';

import {AlbumListsBlock, AlbumListsGrid} from '../components/AlbumLists';
import AlbumListsMenu from '../components/AlbumListsMenu';

import {
	clearAlbumItems,
	fetchGetAlbumList
} from '../actions/albumActions';
import {fetchGetAuth} from '../actions/authActions';
import {
	setAlbumListLayout
} from '../actions/ui/albumList';

export class AlbumList extends Component {
	componentDidMount() {
		this.props.fetchGetAuth();
		this.props.fetchGetAlbumList();
		this.props.clearAlbumItems();
	}

	render() {
		const {albums, fetching, layout} = this.props;

		return (
			<div>
				<Loader active={fetching} size="huge"/>
				<AlbumListsMenu
					layout={layout}
					setAlbumListLayout={this.props.setAlbumListLayout}
				/>
				{
					layout === 'grid' &&
					<AlbumListsGrid
						albums={albums}
					/>
				}
				{
					layout === 'block' &&
					<AlbumListsBlock
						albums={albums}
					/>
				}
			</div>
		);
	}
}

AlbumList.propTypes = {
	albums: PropTypes.array.isRequired,
	clearAlbumItems: PropTypes.func.isRequired,
	fetchGetAlbumList: PropTypes.func.isRequired,
	fetchGetAuth: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired,
	layout: PropTypes.string.isRequired,
	setAlbumListLayout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	albums: state.albumList.albums,
	fetching: state.albumList.fetching,
	layout: state.ui.albumList.layout
});

const mapDispatchToProps = dispatch => ({
	clearAlbumItems() {
		dispatch(clearAlbumItems());
	},
	fetchGetAlbumList() {
		dispatch(fetchGetAlbumList());
	},
	fetchGetAuth() {
		dispatch(fetchGetAuth());
	},
	setAlbumListLayout(params) {
		dispatch(setAlbumListLayout(params));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumList);
