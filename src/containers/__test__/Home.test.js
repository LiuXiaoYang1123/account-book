import React from "react";
import ReactDOM from 'react-dom'
import { mount } from "enzyme";
import Home from "../Home";
import { LIST_VIEW, CHART_VIEW, INCOME, OUTCOME, parseToYearAndMonth } from '../../utility'
import TotalPrice from '../../components/TotalPrice';
import MonthPicker from '../../components/MonthPicker';
import CreateBtn from '../../components/CreateBtn';
import PriceList from "../../components/PriceList";
import TabView from "../../components/TabView";

let wrapper

describe('test Home container component', () => {
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it('should render the default layout', () => {
        const curDate = parseToYearAndMonth('2022/08/05')
        expect(wrapper.find(PriceList).length).toEqual(1)
        expect(wrapper.state('tabView')).toEqual(LIST_VIEW)
        expect(wrapper.find(MonthPicker).props().year).toEqual(curDate.year)
        expect(wrapper.find(MonthPicker).props().month).toEqual(curDate.month + 1)
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
    })
    it('click the another view tab, should change the defalut view', () => {
        wrapper.find('.nav-item a').last().simulate('click')
        expect(wrapper.find(PriceList).length).toEqual(0)
        //expect(wrapper.find('.chart-title').length).toEqual(1)
        expect(wrapper.state('tabView')).toEqual(CHART_VIEW)
    })
    it('click the year and month should trigger the selectNewMonth callback', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.months-range .dropdown-item').at(8).simulate('click')
        expect(wrapper.find(MonthPicker).props().month).toEqual(9)
    })
})

