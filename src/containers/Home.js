import React from 'react';
import '../App.css';
import Ionicon from 'react-ionicons'
import PriceList from '../components/PriceList';
import { LIST_VIEW, CHART_VIEW, INCOME, OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../withContext';
import withRouter from '../withRouter';
import Loader from '../components/Loader';
const newItem = {
    "id": 3,
    "title": "吃饭饭",
    "price": 15,
    "date": "2022-07-03",
    "cid": 2
}
const tabsText = [LIST_VIEW, CHART_VIEW]
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.data.items,
            tabView: tabsText[0]
        }
    }
    componentDidMount() {
        this.props.actions.getInitialData()
    }
    changeView = (view) => {
        this.setState({
            tabView: tabsText[view]
        })
    }
    changeDate = (year, month) => {
        this.props.actions.selectNewMonth(year, month)
    }
    modifyItem = (modifiedItem) => {
        this.props.router.navigate(`/edit/${modifiedItem.id}`)
    }
    createItem = (str) => {
        this.props.router.navigate('/create')
    }
    deleteItem = (selectedItem) => {
        this.props.actions.deleteItem(selectedItem)
    }
    render() {
        const { tabView } = this.state
        const { categories, items, currentDate, isLoading } = this.props.data
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
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
                    {isLoading && <Loader />}
                    {!isLoading &&
                        <>
                            <Tabs activeIndex={0} onTabChange={this.changeView}>
                                <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        font-size="25px"
                                        color={'#007bff'}
                                        icon='ios-paper'
                                    ></Ionicon>
                                    列表模式
                                </Tab>
                                <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        font-size="25px"
                                        color={'#007bff'}
                                        icon='ios-pie'
                                    ></Ionicon>
                                    图表模式
                                </Tab>
                            </Tabs>
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
                        </>
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(withContext(Home))