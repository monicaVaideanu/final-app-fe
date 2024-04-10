import './App.css';
import HomePage from './components/Home';
import {Routes, Route} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import Footer from './utils/Footer'
import RegisterComponent from './components/RegisterComponent';
function App() {
  return (
    <div className="App">

      <Routes>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginComponent/>} />
              <Route path="/register" element={<RegisterComponent/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
