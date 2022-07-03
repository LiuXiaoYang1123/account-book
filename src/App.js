import './App.css';
import PriceList from './components/PriceList';
import TabView from './components/TabView';
import { LIST_VIEW, CHART_VIEW } from './utility'
import TotalPrice from './components/TotalPrice';
const items = [
  {
    "id": 1,
    "title": "和炮炮会晤",
    "price": 200,
    "date": "2022-07-03",
    "category": {
      "id": 1,
      "name": "实习",
      "type": "outcome",
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

function App() {
  return (
    <div>
      <header className='App-header'>
        <h1>小企鹅记账本</h1>
        <TotalPrice
          income={100}
          outcome={200}></TotalPrice>
      </header>
      <TabView
        onTabChange={(name) => console.log(name)}
      >
      </TabView>
      <PriceList
        items={items}
        onModifyItem={(item) => { alert(item.id) }}
        onDeleteItem={(item) => { alert(item.id) }}>
      </PriceList>
    </div>
  );
}

export default App;
