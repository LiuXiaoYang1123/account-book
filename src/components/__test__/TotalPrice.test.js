import React from "react";
import { shallow } from "enzyme";
import TotalPrice from "../TotalPrice";

const props = {
    income: 5000,
    outcome: 648
}

describe('test TotalPrice component', () => {
    it('component should render correct income & outcome number', () => {
        const wrapper = shallow(<TotalPrice {...props} />)
        expect(wrapper.find('.income span').text() * 1).toEqual(5000)
        expect(wrapper.find('.outcome span').text() * 1).toEqual(648)
    })
})