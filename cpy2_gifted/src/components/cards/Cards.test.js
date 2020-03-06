import Cards from "./index";
import { shallow } from "enzyme";
import React from "react";
import {findByTestAtrr} from "../../../utils";

const setUp = (initialState={}) => {
    return shallow(<Cards  {...initialState}/>)
};

describe("Cards component", () => {

    describe("Empty Cards component renders", () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                gifs:[]
            }
            wrapper = setUp(props)
        })

        it("Should render without any errors", () => {
            const component = findByTestAtrr(wrapper, "cardsComponent")
            expect(component.length).toBe(1)
        })
        it("Should not render any gif card", () => {
            const component = findByTestAtrr(wrapper, "gifCard")
            expect(component.length).toBe(0)
        })
    })

    describe("Cards component renders with gifs", () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                gifs:[
                    {id: 1, images: []},
                    {id: 2, images: []},
                    {id: 3, images: []}
                ]
            }
            wrapper = setUp(props)
        })

        it("Should render three card", () => {
            const component = findByTestAtrr(wrapper, "gifCard")
            expect(component.length).toBe(3)
        })
    })
})