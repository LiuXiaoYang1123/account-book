import React from "react";
import { shallow } from 'enzyme'
import Ionicon from "react-ionicons"
import CategorySelect from "../CategorySelect";

export const categories = [
    {
        "id": 1,
        "name": "实习",
        "type": "income",
        "iconName": "logo-yen"
    },
    {
        "id": 2,
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    }
]

let props = {
    categories,
    onSelectCategory: jest.fn()
}
let props_with_category = {
    categories,
    onSelectCategory: jest.fn(),
    selectedCategory: categories[0],
}
describe('test category select component', () => {
    it('renders with categories should render the correct items', () => {
        const wrapper = shallow(<CategorySelect {...props} />)
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        expect(wrapper.find('.category-item.active').length).toEqual(0)
        const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
        expect(firstIcon.length).toEqual(1)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })
    it('render selectedCategory with category item with highlight', () => {
        const wrapper = shallow(<CategorySelect {...props_with_category} />)
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
    })
    it('click the item should add active class and trigger the callback', () => {
        const wrapper = shallow(<CategorySelect {...props_with_category} />)
        wrapper.find('.category-item').at(1).simulate('click')
        expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true);
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false);
        expect(props_with_category.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })
})