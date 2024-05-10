import React, {useState, useEffect} from 'react';
import {Container, Box, TableBody, Paper, TableHead,Table, TableRow, TableCell, TableContainer} from '@mui/material';
import TopAppBar from '../utils/TopAppBar'
import AppDrawer from '../utils/AppDrawer';
import { getAllAuthors} from  '../apis/GetData';

const AuthorsComponent =() => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAllAuthors().then(response => {
      console.log("Data received:", response.data);
      setAuthors(response.data);
    }).catch(error => console.error('Error fetching authors:', error));
  }, []);


  return (
    <div style={{ backgroundColor: '#e8f5e9' }}> 
      <TopAppBar/>
      <AppDrawer/>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Table>
        <Box>
          <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Country</TableCell>
                  </TableRow>
            </TableHead>
                  <TableBody>
                      {authors.map((author, index) => (
                            <TableRow key={index}>
                                <TableCell>{author.firstName}</TableCell>
                                <TableCell>{author.lastName}</TableCell>
                                <TableCell>{author.email ? author.email : "N/A"}</TableCell>
                                <TableCell>{author.description}</TableCell>
                                <TableCell>{author.country}</TableCell>
                            </TableRow>
                        ))}
                  </TableBody>
            </TableContainer>      
         </Box>            
      </Table> 
      </Container>   
    </div>
  )

}
export default AuthorsComponent;