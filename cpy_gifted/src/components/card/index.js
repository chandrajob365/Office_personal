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
		this.setState({ play: nextProps.playAll });
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (
			this.props.data.id !== nextProps.data.id ||
			nextState.play !== this.state.play
		) {
			return true;
		}
		return false;
	}

	togglePlayPause = () => {
		console.log("Clicked to toggle");
		this.setState({ play: !this.state.play });
	};

	render() {
		const { data } = this.props;
		const images = data.images;
		const playPause = this.state.play ? "centered play" : "centered pause";
		return (
			<div
				key={this.props.data.id}
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
