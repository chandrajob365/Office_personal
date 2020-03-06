import Card from "./index";
import { shallow } from "enzyme";
import React from "react";
import {findByTestAtrr} from "../../../utils";


const setUp = (initialState={}) => {
    return shallow(<Card  {...initialState}/>)
};

describe("Card Component", () => {

    describe("Render empty card without any error", ()=> {
        let wrapper;
        beforeEach(() => {
            const props = {
                data: {
                    images: {downsized: {url:""}, "480w_still": {url: ""}}
                }
            }
            wrapper = setUp(props);
        })

        it("Should render without any error", () => {
            const cardComponent = findByTestAtrr(wrapper, "cardComponent");
            expect(cardComponent.length).toBe(1);
        })

        it("Should test initial state", () => {
            expect(wrapper.state().play).toEqual(false)
        })

        it("Should test toggle play/pause", () => {
            const cardComponent = findByTestAtrr(wrapper, "cardComponent");
            cardComponent.simulate("click")
            expect(wrapper.state().play).toEqual(true)
        })

        it("Should test toggle on double click change to false", () => {
            const cardComponent = findByTestAtrr(wrapper, "cardComponent");
            cardComponent.simulate("click")
            cardComponent.simulate("click")
            expect(wrapper.state().play).toEqual(false)
        })
    })

    describe("Render card with gif", () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                data: {
                    images: {downsized: {url:"test_downsized"}, "480w_still": {url: "test_still"}}
                }
            }
            wrapper = setUp(props);
        })

        it("Should render GIF with still image", () => {
            const expected = "test_still";
            const image = findByTestAtrr(wrapper, "gifImage")
            expect(image.prop("src")).toEqual(expected)
        })

        it("Should render GIF with moving GIF with onClick", () => {
            const expected = "test_downsized";
            const cardComponent = findByTestAtrr(wrapper, "cardComponent");
            cardComponent.simulate("click");
            const image = findByTestAtrr(wrapper, "gifImage")
            expect(image.prop("src")).toEqual(expected)
        })
        it("Should show play button on intiall render of GIF", () => {
            const expected = "centered pause";
            const playBtn = findByTestAtrr(wrapper, "playBtn");
            expect(playBtn.prop("className")).toEqual(expected)
        })

        it("Should hide play button on click on GIF ", () => {
            const expected = "centered play";
            const cardComponent = findByTestAtrr(wrapper, "cardComponent");
            cardComponent.simulate("click");
            const playBtn = findByTestAtrr(wrapper, "playBtn");
            expect(playBtn.prop("className")).toEqual(expected)
        })
    })

})