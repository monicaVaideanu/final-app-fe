import React from 'react';
import { Box, Button, Paper, ListItem } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';

const Navbar = () => {
  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px'}}>
        <Box
            sx={{
             backgroundColor: '#b2dfdb', padding: '10px' 
            }}
        >      
            <Button color="inherit"  startIcon={<LibraryBooksIcon />}>Books
            </Button>
            <Button color="inherit" startIcon={<PeopleIcon />}>Authors
            </Button>
        </Box>
    </Paper>
  );
};

export default Navbar;
