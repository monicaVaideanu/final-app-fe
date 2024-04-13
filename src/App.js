import './App.css';
import HomePage from './components/Home';
import {Routes, Route} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import Footer from './utils/Footer'
import RegisterComponent from './components/RegisterComponent';
import AuthorsComponent from './components/AuthorsComponent'
import BooksComponent from './components/BooksComponents';
function App() {
  return (
    <div className="App">

      <Routes>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginComponent/>} />
              <Route path="/register" element={<RegisterComponent/>} />
              <Route path="/books" element={<BooksComponent/>} />
              <Route path="/authors" element={<AuthorsComponent/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
