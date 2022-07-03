import React from "react";
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { LIST_VIEW, CHART_VIEW } from '../utility'
const generateClass = (cur, view) => {
    return (cur === view) ? 'nav-link active' : 'nav-link'
}
const TabView = ({ activeTab, onTabChange }) =>
    <ul className="nav nav-tabs nav-fill my-4">
        <li className="nav-item">
            <a className={generateClass(activeTab, LIST_VIEW)}
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    onTabChange(LIST_VIEW);
                }}>
                <Ionicon
                    className="rounded-circle mr-2"
                    font-size="25px"
                    color={'#007bff'}
                    icon='ios-paper'
                ></Ionicon>
                列表模式
            </a>
        </li>
        <li className="nav-item">
            <a className={generateClass(activeTab, CHART_VIEW)}
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    onTabChange(CHART_VIEW);
                }}>
                <Ionicon
                    className="rounded-circle mr-2"
                    font-size="25px"
                    color={'#007bff'}
                    icon='ios-pie'
                ></Ionicon>
                图表模式
            </a>
        </li>
    </ul>


TabView.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
}

export default TabView 