import React, { Component } from "react";
import Card from "../card";
import "./style.css";
import {throttle} from "../../helper";

export default class Cards extends Component {

    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
        this.state = {
            playAll: false
        }
    }

    handleScroll = () => {
        if(this.cardRef.current.scrollHeight ===  (this.cardRef.current.offsetHeight + this.cardRef.current.scrollTop)) {
            this.handleThrottledScrollEvent();
        }
    }

    handleThrottledScrollEvent = throttle(this.props.fetchGIF, 800);

    togglePlayAll = () => {
        this.setState({playAll: !this.state.playAll})
    }

    render() {
        const {gifs} = this.props;
        const cardsComp = gifs.map(gif => {
            return <Card key={gif.id} data={gif} data-test="gifCard" playAll={this.state.playAll}/>
        }) || null
        return (
            <div style={{postion: "relative"}}>
                {gifs.length > 0 &&
                    <button className="togglePlayAll" onClick={this.togglePlayAll}>
                        {!this.state.playAll ? "Play All" : "Pause All"}
                    </button>
                }
                <div className="cards" ref={this.cardRef} data-test="cardsComponent" onScroll={this.handleScroll}>
                    {cardsComp}
                    {this.props.isLoading && (<span style={{margin: "8rem", padding: "0 4rem", fontSize: "4rem"}}>Loading....</span>)}
                </div>
            </div>

        )
    }
}