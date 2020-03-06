import React, { Component } from "react";
import "./style.css"
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange = (e) => {
        this.setState({value: e.target.value}, () => this.props.updateSearchText(this.state.value))
    }

    render() {
        return (
            <div data-test="gifSearch" className="gif_search">
                <input
                    data-test="searchtext"
                    className="search_box search_text"
                    type="text"
                    placeholder="Search Gif..."
                    autoFocus
                    value={this.state.value}
                    onChange={this.handleChange}/>
            </div>
        )
    }
}