import React, { Component } from "react";
import "../cards/style.css";
export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: this.props.playAll || false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ play: this.props.playAll });
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.props.data.id !== nextProps.data.id ||
			nextState.play !== this.state.play
		) {
			return true;
		}
		return false;
	}

	togglePlayPause = () => {
		console.log("Clicked");
		this.setState({ play: !this.state.play });
	};

	render() {
		const images = this.props.data.images;
		console.log("Play :: ", this.state.play);
		const playPause = this.state.play ? "centered play" : "centered pause";
		return (
			<div
				className="card"
				data-test="cardComponent"
				onClick={this.togglePlayPause}
			>
				<img
					data-test="gifImage"
					alt={this.props.data.title}
					loading="lazy"
					src={
						this.state.play ? images.downsized.url : images["480w_still"].url
					}
				/>
				<div data-test="playBtn" className={playPause}>
					<div className="triangle"></div>
				</div>
			</div>
		);
	}
}
