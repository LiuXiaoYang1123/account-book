import './App.css';
import React from 'react';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { testItems, testCategories } from './testData'
import { flattenArr } from './utility'
import { useState } from 'react';

export const AppContext = React.createContext()
function App() {
  const [items, onChangeItems] = useState(flattenArr(testItems));
  const [categories, onChangeCategories] = useState(flattenArr(testCategories));
  const state = {
    items,
    categories
  }
  return (
    <AppContext.Provider value={{ state }}>
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
