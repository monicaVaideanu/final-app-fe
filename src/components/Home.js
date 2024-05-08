import React, { useEffect, useState } from 'react';
import { Typography, Paper, Container, TableBody, TableCell, TableContainer, Table, TableHead, TableRow } from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getTopTen } from '../apis/GetData';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getTopTen().then((response) => {
        setBooks(response.data)
    }).catch((e) => {
      console.log(e.request)
   });
}, []);

  const handleRowClick = (bookName) => {
    console.log(`Clicked on book: ${bookName}`);
    // Send to book page (could be implemented later)
  };

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
      <TopAppBar />
      <AppDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h6" component="div" style={{ marginBottom: '20px' }}>
          Best Rated Books
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Book Name</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book.name}
                  sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  onClick={() => handleRowClick(book.name)}
                >
                  <TableCell component="th" scope="row">
                    {book.name}
                  </TableCell>
                  <TableCell align="right">{book.avrRating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default HomePage;
