import logo from './logo.svg';
import './App.css';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
      {/* <Navbar/> */}
    </div>
  );
}

export default App;
