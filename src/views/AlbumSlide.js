import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SlideSettings from '../components/SlideSettings';

import Slide from '../components/Slide';
import ToggleSettings from '../components/ToggleSettings';
import Dots from '../components/Dots';
import LeftArrow from '../components/Arrows/leftArrow';
import RightArrow from '../components/Arrows/rightArrow';
import SlideExitButton from '../components/SlideExitButton';

import {
	setFullScreen
} from '../actions/ui';

import {
	setAlbumId,
	setAlbumTitle
} from '../actions/ui/album';

import {
	setTranslateValue,
	setIndex
} from '../actions/slideActions';

import {
	toggleSetting
} from '../actions/settingActions';

import { fetchGetAlbumItems } from '../actions/albumActions';

import './AlbumSlide.css';

export class AlbumSlide extends Component {
	state = {}

	componentDidMount() {
		const { albums, match } = this.props;
		const id = match && match.params && match.params.id;
		const album = albums && albums.find(i => i.id === id);
		const title = album && album.title;

		this.props.setFullScreen(true);
		this.props.setAlbumId(id);
		title && this.props.setAlbumTitle(title);
		this.props.fetchGetAlbumItems(id);

		//console.log('[AlbumSlide] componentDidMount');
	}

	componentDidUpdate = (prevProps) => {

		//console.log('[AlbumSlide] componentdidUpdate');

		const { autoplay } = this.props;

		if (autoplay && prevProps.autoplay !== autoplay) {
			let x = window.setInterval(() => {
				this.goToNextSlide();
			}, 3000);

			this.setState({ interval : x });
		}
		else if (!autoplay && prevProps.autoplay !== autoplay) {
			let x = window.clearInterval(this.state.interval);
			this.setState({ interval : x });
		}
	}

	componentWillUnmount () {
		this.props.setFullScreen(false);
	}

	renderSlides = () => {
		//console.log('[AlbumSlide] renderSlides');
		//console.log(this.props.albumItems);

		if (!this.props.photos) {
			return;
		}

		let photos = this.props.photos;
		return (
			photos.map((curr, i) => {
				let baseUrl = photos[i].baseUrl;
				let w = photos[i].mediaMetadata.width;
				let h = photos[i].mediaMetadata.height;
				let infoSize = '';
				if (w && h) {
					infoSize = `=w${w}-h${h}`;
				}

				return (
					<Slide key={i} image={baseUrl.concat(infoSize)} />
				);
			})
		);
	}

	goToPrevSlide = () => {
		//console.log('[AlbumSlide] goToPrevSlide called');

		const { index, translateValue, setIndex, setTranslateValue } = this.props;

		if (index === 0) return;

		setTranslateValue(translateValue + this.getSlideWidth());
		setIndex(index - 1);
	}

	goToNextSlide = () => {
		//console.log('[AlbumSlide] goToNextSlide called');

		const { photos, index, translateValue, setIndex, setTranslateValue } = this.props;
		if (index === photos.length - 1) {
			setTranslateValue(0);
			return setIndex(0);
		}

		setTranslateValue(translateValue - this.getSlideWidth());
		setIndex(index + 1);
	}

	getSlideWidth = () => {
		let dom = document.querySelector('.slide');

		if (!dom)
			return 0;

		let cw = dom.clientWidth;
		return  cw;
	}

	handleDotClick = (i) => {
		const { index, translateValue, setIndex, setTranslateValue } = this.props;
		if (i === index) return;

		if (i > index) {
			setTranslateValue(-(i * this.getSlideWidth()));
		}
		else {
			setTranslateValue(translateValue + ((index - i) * (this.getSlideWidth())));
		}

		setIndex(i);
	}

	render() {
		const {
			id,
			photos,
			index,
			translateValue,
			toggleSetting,
			showDots,
			coolButtons,
			settingVisible,
			autoplay
		} = this.props;

		return (
			<div className="slider">
				<SlideSettings
					autoplay={autoplay}
					showDots={showDots}
					toggleSetting={toggleSetting}
					visible={settingVisible}
				/>
				<ToggleSettings
					visible={settingVisible}
					toggleSetting={toggleSetting}
				/>
				<div className="slider-wrapper"
					style={{
						transform: `translateX(${translateValue}px)`,
						transition: 'transform ease-out 0.45s'
					}}>
					{
						this.renderSlides()
					}
				</div>
				<Dots
					visible={showDots}
					index={index}
					images={photos}
					dotClick={this.handleDotClick}
				/>
				<LeftArrow
					prevSlide={this.goToPrevSlide}
					coolButtons={coolButtons}
				/>
				<RightArrow
					nextSlide={this.goToNextSlide}
					coolButtons={coolButtons}
				/>
				<SlideExitButton id={id} />
			</div>
		);
	}
}

AlbumSlide.propTypes = {
	albums:PropTypes.array.isRequired,
	autoplay:PropTypes.bool.isRequired,
	coolButtons: PropTypes.bool.isRequired,
	fetchGetAlbumItems: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	photos: PropTypes.array.isRequired,
	setAlbumId: PropTypes.func.isRequired,
	setAlbumTitle: PropTypes.func.isRequired,
	setFullScreen: PropTypes.func.isRequired,
	setIndex: PropTypes.func.isRequired,
	settingVisible: PropTypes.bool.isRequired,
	setTranslateValue: PropTypes.func.isRequired,
	showDots: PropTypes.bool.isRequired,
	toggleSetting: PropTypes.func.isRequired,
	translateValue: PropTypes.number.isRequired
};

const mapStateToProps = ( state ) => {
	//console.log('[AlbumSlide] mapStateToProps!!');
	//console.log(JSON.stringify(state));

	return {
		albums: state.albumList.albums,
		photos: state.albumItems.photos,
		id: state.ui.album.id,
		index: state.albumSlide.index,
		translateValue: state.albumSlide.translateValue,
		showDots: state.slideSettings.showDots,
		settingVisible: state.slideSettings.visible,
		autoplay: state.slideSettings.autoplay,
		coolButtons:state.slideSettings.coolButtons
	};
};

const mapDispatchToProps = dispatch => ({
	fetchGetAlbumItems(params) {
		dispatch(fetchGetAlbumItems(params));
	},

	setAlbumId(params) {
		dispatch(setAlbumId(params));
	},
	setAlbumTitle(params) {
		dispatch(setAlbumTitle(params));
	},
	setFullScreen(params) {
		dispatch(setFullScreen(params));
	},

	setTranslateValue: (params) => {
		dispatch(setTranslateValue(params));
	},

	setIndex: (params) => {
		dispatch(setIndex(params));
	},

	toggleSetting: (params) => {
		dispatch(toggleSetting(params));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumSlide);
