import Search from "./index";
import { shallow, mount } from "enzyme";
import React from "react";
import {findByTestAtrr} from "../../../utils";


const setUp = (initialState={}) => {
    return  mount(<Search  {...initialState} />)
};

describe("Search Component", () => {

    describe("Render empty search without any error", ()=> {
        let wrapper;
        beforeEach(() => {
            wrapper = setUp()
        })

        it("Should render empty search field", () => {
           const searchComponent = findByTestAtrr(wrapper, "searchtext");
           expect(searchComponent.length).toBe(1)
        })
    })

    describe("Render search without any error", ()=> {


        it("Should render search field with text", () => {
            const updateSearchText = jest.fn()
            const wrapper = setUp({updateSearchText})
            const searchComponent = findByTestAtrr(wrapper, "searchtext");
            const expected = "dog";
            searchComponent.simulate("change", {target: {value: expected}});
            expect(updateSearchText).toHaveBeenCalledWith(expected)
        })
    })
})