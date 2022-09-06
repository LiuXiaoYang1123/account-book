import './App.css';
import React from 'react';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { testItems, testCategories } from './testData'
import { flattenArr, ID, padLeft, parseToYearAndMonth } from './utility'
import { useState } from 'react';
export const AppContext = React.createContext()
function App() {
  const [state, onChangeState] = useState({
    items: flattenArr(testItems),
    categories: flattenArr(testCategories)
  })

  const actions = {
    deleteItem: (item) => {
      onChangeState(() => {
        let itemsTemp = { ...state };
        delete itemsTemp.items[item.id]
        return itemsTemp
      })
    },
    createItem: (data, categoryId) => {
      const newID = ID()
      const parseDate = parseToYearAndMonth(data.date)
      data.monthCategory = `${parseDate.year}-${padLeft(parseDate.month)}`
      data.category = state.categories[categoryId]
      const newItem = { ...data, id: newID, cid: categoryId }
      const categories = state.categories
      onChangeState(() => {
        let itemsTemp = { ...state.items }
        itemsTemp[newItem.id] = newItem
        console.log(itemsTemp)
        return {
          items: { ...itemsTemp, [newID]: newItem },
          categories
        }
      })

    },
    updateItem: (data, categoryId) => {
      const newItem = {
        ...data,
        cid: categoryId,
      }
      const categories = state.categories
      onChangeState(() => {
        let itemsTemp = { ...state.items }
        itemsTemp[newItem.id] = newItem
        console.log(itemsTemp)
        return {
          items: { ...itemsTemp, [newItem.id]: newItem },
          categories
        }
      })

    }
  }
  return (
    <AppContext.Provider value={{
      state: state,
      actions: actions
    }}>
      <Router>
        <ul>
          <NavLink to='/'>Home</NavLink >
          <NavLink to='/create'>Create</NavLink >
          <NavLink to='/edit/1'>edit</NavLink >
        </ul>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Create />} />
        </Routes>
      </Router>
    </AppContext.Provider>

  );
}

export default App;
