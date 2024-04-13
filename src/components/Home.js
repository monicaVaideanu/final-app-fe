import React, {useEffect, useState} from 'react';
import {Typography,Paper, Container, Grid,TableBody,TableCell,TableContainer,Table,TableHead,TableRow } from '@mui/material';
import b1 from '../pictures/b1.jpg'
import b2 from '../pictures/b2.webp'
import b3 from '../pictures/b3.jpg'
import TopAppBar from '../utils/TopAppBar'
import AppDrawer from '../utils/AppDrawer';
import { useNavigate } from 'react-router-dom';
const books = [
  { name: 'b 1', rating: '9.8' },
  { name: 'b 2', rating: '9.5' },
  { name: 'b 3', rating: '9.4' },
  { name: 'b 4', rating: '9.8' },
  { name: 'b 5', rating: '9.5' },
  { name: 'b 6', rating: '9.4' },
   { name: 'b 7', rating: '9.8' },
  { name: 'b 8', rating: '9.5' },
  { name: 'b 9', rating: '9.4' },
  { name: 'b 10', rating: '9.4' }

];

const HomePage = () => {
  const handleRowClick = (bookName) => {
    console.log(`Clicked on book: ${bookName}`);
    // send to book page  
  };

return (
         <div style={{ backgroundColor: '#e8f5e9' }}> 
          <TopAppBar/>
          <AppDrawer/>
          <Container maxWidth="md" style={{marginTop:'20x'}}>
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
                      key={book.name}
                      sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                      onClick={() => handleRowClick(book.name)}
                    >
                      <TableCell component="th" scope="row">
                        {book.name}
                      </TableCell>
                      <TableCell align="right">{book.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          </Container> 

        </div>
        );
    
}
export default HomePage;
