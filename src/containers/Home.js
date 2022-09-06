import '../App.css';
import PriceList from '../components/PriceList';
import TabView from '../components/TabView';
import { LIST_VIEW, CHART_VIEW, INCOME, OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import React from 'react';
export const categories = {
    "1": {
        "id": 1,
        "name": "实习",
        "type": "income",
        "iconName": "ios-accessibility"
    },
    "2": {
        "id": 1,
        "name": "实习",
        "type": "outcome",
        "iconName": "ios-plane"
    }
}
export const items = [
    {
        "id": 1,
        "title": "爸妈给的零花钱",
        "price": 100,
        "date": "2022-07-03",
        "cid": 1
    },
    {
        "id": 2,
        "title": "和炮炮会晤",
        "price": 200,
        "date": "2022-09-03",
        "cid": 2

    }
]
const newItem = {
    "id": 3,
    "title": "吃饭饭",
    "price": 15,
    "date": "2022-07-03",
    "cid": 2
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth('2022/09/05'),
            tabView: LIST_VIEW
        }
    }

    changeView = (view) => {
        this.setState({
            tabView: view
        })
    }
    changeDate = (year, month) => {
        const changedDate = {}
        changedDate.year = year
        changedDate.month = month
        this.setState({
            currentDate: changedDate
        })
    }
    modifyItem = (modifiedItem) => {
        const modifiedItems = this.state.items.map(item => {
            if (item.id === modifiedItem.id) return { ...item, title: '更新后的标题' }
            else return item
        })
        this.setState({
            items: modifiedItems
        })
    }
    createItem = (str) => {
        this.setState({
            items: [newItem, ...this.state.items]
        })
        console.log(1)
    }
    deleteItem = (selectedItem) => {
        const filteredItems = this.state.items.filter(item => item.id !== selectedItem.id)
        this.setState({
            items: filteredItems
        })
    }
    render() {
        const { items, currentDate, tabView } = this.state
        const itemsWithCategory = items.map(item => {
            item.category = categories[item.cid]
            return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach((item) => {
            if (item.category.type === INCOME) totalIncome += item.price;
            else totalOutcome += item.price;
        })
        return (
            <div>
                <header className='App-header'>
                    <h1 className='header-name'>小企鹅记账本</h1>
                    <div className='row m-2 header-more'>
                        <div className='col'>
                            <MonthPicker
                                year={currentDate.year}
                                month={currentDate.month}
                                onDateChange={this.changeDate}
                            ></MonthPicker>
                        </div>
                        <div className='col'>
                            <TotalPrice
                                income={totalIncome}
                                outcome={totalOutcome}></TotalPrice>
                        </div>
                    </div>
                </header>
                <div className='main-body'>
                    <TabView
                        onTabChange={this.changeView}
                    >
                    </TabView>
                    <CreateBtn
                        onCreateBtn={this.createItem} />
                    {tabView === LIST_VIEW &&
                        <PriceList
                            items={itemsWithCategory}
                            onModifyItem={this.modifyItem}
                            onDeleteItem={this.deleteItem}>
                        </PriceList>
                    }
                    {tabView === CHART_VIEW &&
                        <h1>图表</h1>
                    }
                </div>


            </div>
        )

    }


}
export default Home