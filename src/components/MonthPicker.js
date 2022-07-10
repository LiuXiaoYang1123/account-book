import React from "react";
import { padLeft, genRangeList } from '../utility'
class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            yearSelect: this.props.year,
            monthSelect: this.props.month
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }
    handleClick = (event) => {
        if (this.node.contains(event.target)) return;
        this.setState({
            isOpen: false,
        })
    }
    toggleDropDown = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    changeSelectClass = (cur, tar) => {
        return (cur === tar ? 'dropdown-item active' : 'dropdown-item')
    }
    selectYear = (event, yearNum) => {
        event.preventDefault();
        this.setState({
            yearSelect: yearNum
        })
    }
    selectMonth = (event, monthNum) => {
        const { onDateChange } = this.props
        event.preventDefault();
        this.setState({
            monthSelect: monthNum,
            isOpen: !this.state.isOpen
        })
        onDateChange(this.state.yearSelect, monthNum)
    }
    render() {
        const { year } = this.props
        const { isOpen, yearSelect, monthSelect } = this.state
        const monthRange = genRangeList(1, 12)
        const yearRange = genRangeList(-4, 9).map(num => num + year)
        return (
            <div className="dropdown month-picker" ref={(ref) => { this.node = ref }}>
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle"
                    onClick={this.toggleDropDown}>
                    {`${yearSelect}年 ${padLeft(monthSelect)}月`}
                </button>
                {
                    isOpen &&
                    <div className="dropdown-menu" style={{ display: 'block' }}>
                        <div className="row">
                            <div className="col border-right">
                                {yearRange.map((yearNum, index) =>
                                    <a key={index}
                                        className={this.changeSelectClass(yearNum, yearSelect)}
                                        onClick={event => this.selectYear(event, yearNum)}
                                        href='#'>{yearNum}年</a>
                                )}
                            </div>
                            <div className="col">
                                {monthRange.map((monthNum, index) =>
                                    <a key={index}
                                        className={this.changeSelectClass(monthNum, monthSelect)}
                                        onClick={event => this.selectMonth(event, monthNum)}
                                        href='#'>{padLeft(monthNum)}月</a>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
MonthPicker.defaultProps = {
    year: 2022,
    month: 7,
}
export default MonthPicker