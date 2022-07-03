import '../App.css';
import PriceList from '../components/PriceList';
import TabView from '../components/TabView';
// import { LIST_VIEW, CHART_VIEW } from '../utility'
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import React from 'react';
const items = [
    {
        "id": 1,
        "title": "爸妈给的零花钱",
        "price": 100,
        "date": "2022-07-03",
        "category": {
            "id": 1,
            "name": "实习",
            "type": "income",
            "iconName": "ios-plane"
        }
    },
    {
        "id": 2,
        "title": "和炮炮会晤",
        "price": 200,
        "date": "2022-07-03",
        "category": {
            "id": 1,
            "name": "实习",
            "type": "outcome",
            "iconName": "ios-plane"
        }
    }
]

class Home extends React.Component {
    render() {
        let totalIncome = 0, totalOutcome = 0
        items.forEach((item) => {
            if (item.category.type === "income") totalIncome += item.price;
            else totalOutcome += item.price;
        })
        return (
            <div>
                <header className='App-header'>
                    <h1>小企鹅记账本</h1>
                </header>
                <div className='row m-2'>
                    <div className='col'>
                        <MonthPicker
                            onDateChange={(year, month) => { console.log(year, month) }}
                        ></MonthPicker>
                    </div>
                    <div className='col'>
                        <TotalPrice
                            income={totalIncome}
                            outcome={totalOutcome}></TotalPrice>
                    </div>
                </div>

                <TabView
                    onTabChange={(name) => console.log(name)}
                >
                </TabView>
                <CreateBtn
                    onCreateBtn={(content) => console.log(content)} />
                <PriceList
                    items={items}
                    onModifyItem={(item) => { alert(item.id) }}
                    onDeleteItem={(item) => { alert(item.id) }}>
                </PriceList>
            </div>
        )

    }


}
export default Home