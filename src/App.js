import './App.css';
import React from 'react';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { flattenArr, ID, padLeft, parseToYearAndMonth } from './utility'
import { useState } from 'react';
import axios from "axios"
export const AppContext = React.createContext()
function App() {
  const [state, onChangeState] = useState({
    items: {},
    categories: {},
    currentDate: parseToYearAndMonth(),
    isLoading: false
  })

  const actions = {
    getInitialData: () => {
      const { items, categories, currentDate } = state
      onChangeState(() => {
        return {
          items,
          categories,
          currentDate,
          isLoading: true
        }
      })
      const getUrlWithData = `/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}`
      const promiseArr = [axios.get('/categories'), axios.get(getUrlWithData)]
      Promise.all(promiseArr).then(arr => {
        const [categories, items] = arr
        onChangeState(() => {
          return {
            items: flattenArr(items.data),
            categories: flattenArr(categories.data),
            currentDate: parseToYearAndMonth(),
            isLoading: false
          }
        })
      })
    },
    selectNewMonth: (year, month) => {
      const getURLWithData = `/items?monthCategory=${year}-${padLeft(month)}`
      axios.get(getURLWithData).then(items => {
        onChangeState(() => {
          return {
            items: flattenArr(items.data),
            categories: { ...state.categories },
            currentDate: { year, month }
          }
        })
      })
    },
    deleteItem: (item) => {
      axios.delete(`/items/${item.id}`)
      delete state.items[item.id]
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
      axios.post('/items', newItem)
      const { categories, currentDate } = state
      onChangeState(() => {
        let itemsTemp = { ...state.items }
        itemsTemp[newItem.id] = newItem
        console.log(itemsTemp)
        return {
          items: { ...itemsTemp, [newID]: newItem },
          categories,
          currentDate
        }
      })

    },
    updateItem: (data, categoryId) => {
      const newItem = {
        ...data,
        cid: categoryId,
      }
      const { categories, currentDate } = state
      axios.patch(`/items/${data.id}`, newItem)
      onChangeState(() => {
        let itemsTemp = { ...state.items }
        itemsTemp[newItem.id] = newItem
        console.log(itemsTemp)
        return {
          items: { ...itemsTemp, [newItem.id]: newItem },
          categories,
          currentDate
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
