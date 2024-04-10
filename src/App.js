import './App.css';
import HomePage from './components/Home';
import {Routes, Route} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import Footer from './utils/Footer'
import RegisterComponent from './components/RegisterComponent';
import BooksComponent from './components/BooksComponents'
import AuthorsComponent from './components/AuthorsComponent'
function App() {
  return (
    <div className="App">

      <Routes>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginComponent/>} />
              <Route path="/register" element={<RegisterComponent/>} />
              <Route path="/books" component={BooksComponent} />
              <Route path="/authors" component={AuthorsComponent} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
