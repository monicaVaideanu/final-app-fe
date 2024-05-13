import React, { useState, useEffect } from 'react';
import { getAllPendingBooks, acceptBook, rejectBook } from  '../apis/GetData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    getAllPendingBooks().then(response => {
      console.log("Data received:", response.data);
      const pendingBooks = response.data.filter(book => book.status === 'PENDING');
      setBooks(pendingBooks);
    }).catch(error => console.error('Error fetching books:', error));
  }, []);
  
  const handleAccept = (bookId) => {
    acceptBook(bookId, token).then(() => {
      setBooks(currentBooks => currentBooks.filter(book => book.bookId !== bookId));
      console.log(`Book with ID: ${bookId} accepted`);
    }).catch(error => console.error('Error accepting book:', error));
  };
  
  const handleReject = (bookId) => {
    rejectBook(bookId, token).then(() => {
      setBooks(currentBooks => currentBooks.filter(book => book.bookId !== bookId));
      console.log(`Book with ID: ${bookId} rejected`);
    }).catch(error => console.error('Error rejecting book:', error));
  };
  
  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
    <TopAppBar />
    <AppDrawer />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.bookId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.name}
              </TableCell>
              <TableCell align="right">{book.description}</TableCell>
              <TableCell align="right">{book.yearPublication}</TableCell>
              <TableCell align="right">{book.publisher}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleAccept(book.bookId)} color="success">
                  Accept
                </Button>
                <Button onClick={() => handleReject(book.bookId)} color="error">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default AdminBooksPage;
