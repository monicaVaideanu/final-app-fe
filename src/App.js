import './App.css';
import HomePage from './components/Home';
import {Routes, Route} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import Footer from './utils/Footer'
import RegisterComponent from './components/RegisterComponent';
import AuthorsComponent from './components/AuthorsComponent'
import BooksComponent from './components/BooksComponents';
import MyProfile from './components/MyProfileComponent';
import AboutUsComponent from './components/AboutUsComponent';
import ContactComponent from './components/ContactComponent';
import UploadBook from './components/UploadBook';
import ProtectedRoute from './components/ProtectedRoute';
import AdminBooksPage from './components/AdminBookPage';
import Book from './components/Book';
import AddGenre from './components/AddGenre';
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
              <Route path="/profile" element={<MyProfile/>} />
              <Route path="/about" element={<AboutUsComponent/>} />
              <Route path="/contact" element={<ContactComponent/>} />
              <Route path="/adminPage" element={<AdminBooksPage/>} />
              <Route path="/book/:bookId"  element={<Book/>} />
              <Route path="/addGenre"  element={<AddGenre/>} />
              <Route path="/upload" element={
                <ProtectedRoute roles={['AUTHOR', 'ADMIN']}>
                  <UploadBook />
                </ProtectedRoute>
              } />
              <Route path="/adminPage" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminBooksPage />
                </ProtectedRoute>
              } />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
