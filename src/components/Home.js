import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const HomePage = () => {
        return (
         <div> 
        <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
          <AppBar position="static" color="default" sx={{ backgroundColor: '#b2dfdb' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
             <Typography variant="h6" color="inherit">
                Great Reads
              </Typography>
              <Box sx={{backgroundColor: '#b2dfdb', padding: '10px'}}
            >      
            <Button color="inherit"  startIcon={<LibraryBooksIcon />}>Books
            </Button>
            <Button color="inherit" startIcon={<PeopleIcon />}>Authors
            </Button>
        </Box>
              <Box>
                <Button color="inherit" startIcon={<LoginIcon />}>Login</Button>
                <Button color="inherit" startIcon={<AppRegistrationIcon />}>Register</Button>
              </Box>
            </Toolbar>
          </AppBar>
          </Paper>  
        </div>
        );
    
}
export default HomePage;
