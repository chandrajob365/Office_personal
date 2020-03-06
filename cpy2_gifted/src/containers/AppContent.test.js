import AppContent from "./AppContent";
import { mount } from "enzyme";
import React from "react";
import fetchMock from "fetch-mock";
import "whatwg-fetch";
import {findByTestAtrr} from "../../utils";

const setUp = (initialState={}) => {
    return mount(<AppContent  initialState={initialState}/>)
};

beforeAll(() => {
    global.fetch = fetch;
})

afterEach(() => {
    fetchMock.restore();
})

const mockResponse = {
    data: [
        {
            id: "1",
            title:"test",
            images: {downsized: {url:"test_downsized"}, "480w_still": {url: "test_still"}}
        }
    ]
}

describe("AppContent component", () => {

    describe("Component Renders", () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setUp()
        })
        it("Should render without errors", ()=> {
            const component = findByTestAtrr(wrapper, "appContent");
            expect(component.length).toBe(1);
        })
    })

    describe("Test fetch", () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        })
        it("Fetch returns data and update props", async() => {
            fetchMock.get("begin:https://api.giphy.com", mockResponse)
            const response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=happy&limit=25");
            const result = await response.json();
            expect(result).toEqual(mockResponse)
            wrapper.setState({gifs: result.data})
            wrapper.update();
            const component = findByTestAtrr(wrapper, "cardInAppContent");
            expect(component.prop("gifs")).toEqual(result.data)
            fetchMock.restore();
        })
    })
})