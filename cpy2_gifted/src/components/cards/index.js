import React, { Component } from "react";
import Card from "../card";
import "./style.css";
export default class Cards extends Component {
	constructor(props) {
		super(props);
		this.cardRef = React.createRef();
		this.state = {
			playAll: false
		};
	}

	throttle = (fn, limit) => {
		let flag = true;
		return () => {
			if (flag) {
				fn();
				flag = false;
				setTimeout(() => (flag = true), limit);
			}
		};
	};

	throttledScrolling = this.throttle(this.props.fetchGIF, 800);

	handleScroll = () => {
		if (
			this.cardRef.current.scrollHeight ===
			this.cardRef.current.scrollTop + this.cardRef.current.offsetHeight
		) {
			console.log("handle scroll called");
			this.throttledScrolling();
		}
	};

	handleTogglePlayAll = () => {
		this.setState({ playAll: !this.state.playAll });
	};
	render(props) {
		const { gifs } = this.props;
		const cardsComp =
			gifs.map(gif => {
				return (
					<Card
						key={gif.id}
						data={gif}
						data-test="gifCard"
						playAll={this.state.playAll}
					/>
				);
			}) || null;
		// console.log("cardsComp :: ", cardsComp)
		return (
			<div style={{ position: "relative" }}>
				{gifs && gifs.length > 0 && (
					<button className="togglePlayAll" onClick={this.handleTogglePlayAll}>
						{this.state.playAll ? "Pause All" : "Play All"}
					</button>
				)}
				<div
					className="cards"
					ref={this.cardRef}
					data-test="cardsComponent"
					onScroll={this.handleScroll}
				>
					{cardsComp}
				</div>
			</div>
		);
	}
}
