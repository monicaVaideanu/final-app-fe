import React, { useEffect, useState } from 'react';
import { Typography, Paper,Grid, Container, TableBody, TableCell, TableContainer, Table, TableHead, TableRow } from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getTopTen } from '../apis/GetData';
import b1 from '../pictures/b1.jpg'
import b2 from '../pictures/b2.webp'
import b3 from '../pictures/b3.jpg'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getTopTen().then((response) => {
        setBooks(response.data)
    }).catch((e) => {
      console.log(e.request)
   });
}, []);

  const handleRowClick = (bookId) => {
    console.log(`Clicked on book: ${bookId}`);
    navigate('/book/${bookId}')
  };

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
      <TopAppBar />
      <AppDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <img src={b1} alt= "" style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
              </Grid>
              <Grid item xs={12} sm={4} >
                  <img src={b2} alt= "" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Grid>
              <Grid item xs={12} sm={4}>
                  <img src={b3} alt= "" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  key={book.bookId}
                  sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  onClick={() => handleRowClick(book.bookId)}
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
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
