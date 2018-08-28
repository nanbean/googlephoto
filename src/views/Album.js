import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { setAlbumId } from '../actions/ui/album';

class Album extends Component {
	componentDidMount() {
		const { match } = this.props;
		const id = match && match.params && match.params.id;

		this.props.setAlbumId(id);
	}

	render() {
		const { id } = this.props;

		return (
			<div>
				<Header as="h2" textAlign="center">
					<Header.Content>
						Album List
						<Header.Subheader>{id}</Header.Subheader>
					</Header.Content>
				</Header>
			</div>
		);
	}
}

Album.propTypes = {
	id: PropTypes.string.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	setAlbumId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	id: state.ui.album.id
});

const mapDispatchToProps = dispatch => ({
	setAlbumId(params) {
		dispatch(setAlbumId(params));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Album);
