import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';

const TopAppBar = ({ }) => {
  const navigate = useNavigate(); 
  const goToLogin = () => navigate('/login');

  const goToRegister = () => navigate('/register');
  const goToHome = () => navigate('/home')

  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: '#b2dfdb' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" color="inherit" onClick={goToHome} style={{ cursor: 'pointer' }}>
              Great Reads
            </Typography>
          <Box sx={{backgroundColor: '#b2dfdb', padding: '10px', justifyContent: 'center'}}>     
              <Typography variant="h10" color="inherit">
                The place where you find your next read.
              </Typography>     
          </Box>
          <Stack spacing={2} direction="row">
            <Button color="inherit" startIcon={<LoginIcon />} onClick={goToLogin}>Login</Button>
            <Button color="inherit" startIcon={<AppRegistrationIcon />} onClick={goToRegister}>Register</Button>
          </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default TopAppBar;