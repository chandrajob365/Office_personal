import App from "./App";
import { shallow } from "enzyme";
import React from "react";
import {findByTestAtrr} from "../utils";

const setUp = (initialState={}) => {
    return shallow(<App  initialState={initialState}/>)
};

describe("App Component", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setUp();
    })

    it("Should render without errors", () => {
        const component = findByTestAtrr(wrapper, 'appComponent');
        expect(component.length).toBe(1);
    })
})