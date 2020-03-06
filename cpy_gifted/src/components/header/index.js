import React, {Component} from "react";
import "./style.css"
import {LIGHT, DARK} from "../../AppConstants";

export default class AppHeader extends Component {
    state = {
        theme: LIGHT
    }

    toggleAppTheme = () => {
        const theme = this.state.theme ;
        if(theme === LIGHT) {
            this.setState({theme: DARK}, () => this.updateDataTheme(DARK));
        } else {
            this.setState({theme: LIGHT}, () =>this.updateDataTheme(LIGHT));
        }
    }

    updateDataTheme = (theme) => {
        document.getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", theme)
    }

    render() {
        const theme = this.state.theme || LIGHT;
        const toggleBtn_class = theme === LIGHT ? "toggle-btn active" : "toggle-btn"
        return (
            <header className="app_header" data-test="appHeader">
                <span className="header_text" data-test="headerText" >GIFt’ed</span>
                <div data-test="themeSwitch" className="switch" onClick={this.toggleAppTheme}>
                    <div data-test="toggleBtn" className={toggleBtn_class}>
                        <div className="inner-circle"/>
                    </div>
                </div>
            </header>
        )
    }

}

