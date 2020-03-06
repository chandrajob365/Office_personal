import AppHeader from "./index";
import { shallow } from "enzyme";
import React from "react";
import {findByTestAtrr} from "../../../utils";

const setUp = (initialState={}) => {
    return shallow(<AppHeader  initialState={initialState}/>)
};

describe("AppHeader component", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setUp()
    })
    it("Should render without errors", ()=> {
        const component = findByTestAtrr(wrapper, "appHeader");
        expect(component.length).toBe(1);
    })

    it("Should render header span", () => {
        const component = findByTestAtrr(wrapper, "appHeader");
        const span = component.find(".header_text");
        expect(span.length).toBe(1)
    })

    it("Should render header span text GIFt’ed", () => {
        const component = findByTestAtrr(wrapper, "appHeader");
        const span = component.find(".header_text");
        expect(span.text()).toEqual("GIFt’ed")
    })

    it("Initial render :: Should render toggle-btn active class for LIGHT theme", () => {
        const expectedLightTheme = "toggle-btn active";
        const toggleBtn = findByTestAtrr(wrapper, "toggleBtn");
        expect(toggleBtn.prop("className")).toEqual(expectedLightTheme)
    })

    it("First click :: Should render toggle-btn active class for DARK theme", () => {
        const expectedDarkTheme = "toggle-btn";
        const themeSwitch = findByTestAtrr(wrapper, "themeSwitch");
        themeSwitch.simulate("click");
        const toggleBtn = findByTestAtrr(wrapper, "toggleBtn");
        expect(toggleBtn.prop("className")).toEqual(expectedDarkTheme)
    })

    it("Second click :: Should render toggle-btn active class for LIGHT theme", () => {
        const expectedLightTheme = "toggle-btn active";
        const themeSwitch = findByTestAtrr(wrapper, "themeSwitch");
        themeSwitch.simulate("click");
        themeSwitch.simulate("click");
        const toggleBtn = findByTestAtrr(wrapper, "toggleBtn");
        expect(toggleBtn.prop("className")).toEqual(expectedLightTheme)
    })
})