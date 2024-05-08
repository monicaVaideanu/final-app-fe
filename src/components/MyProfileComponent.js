import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';


const MyProfile = () => {
  const { userId } = useParams(); // Presupunem că ID-ul utilizatorului este pasat ca un parametru de rută
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/books/list/user/${userId}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8081/books/list/${userId}/${bookId}`);
      fetchBooks(); // Reîmprospătează lista după ștergere
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };
  const handleAddBook = async (newBook) => {
    try {
      await axios.post('http://localhost:8081/books/list/addBook', newBook);
      fetchBooks();
    } catch (error) {
      console.error('Failed to add book', error);
    }
  };
  
  const handleUpdateStatus = async (bookId, newStatus) => {
    try {
      await axios.post(`http://localhost:8080/books/list/updateStatus`, { bookId, newStatus, userId });
      fetchBooks();
    } catch (error) {
      console.error('Failed to update book status', error);
    }
  };
  

  return (
    <div>
      <h1>My Profile - Wish and Read List</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteBook(book.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyProfile;
