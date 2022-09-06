import './App.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
