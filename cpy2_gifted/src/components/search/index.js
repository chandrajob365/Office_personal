import React, { Component } from "react";
import "./style.css"
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            value: ""
        }
    }
    componentDidMount() {
        this.nameInput.current.focus();
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
                    ref={this.nameInput}
                    value={this.state.value}
                    onChange={this.handleChange}/>
            </div>
        )
    }
}