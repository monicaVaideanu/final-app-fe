import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const TopAppBar = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = !!localStorage.getItem('userToken');  // Verifică dacă utilizatorul este logat
  
  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');
  const goToHome = () => navigate('/home');
  const goToProfile = () => navigate('/profile');
  
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Șterge tokenul JWT
    navigate('/login'); // Redirecționează către pagina de login
    window.location.reload(); // Reîncarcă pagina pentru a actualiza UI-ul
  };

  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: '#b2dfdb' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit" onClick={goToHome} style={{ cursor: 'pointer' }}>
          Great Reads
        </Typography>
        <Box sx={{ backgroundColor: '#b2dfdb', padding: '10px', justifyContent: 'center' }}>
          <Typography variant="h10" color="inherit">
            The place where you find your next read.
          </Typography>
        </Box>
        <Stack spacing={2} direction="row">
          {isLoggedIn ? (
            <>
              <Button color="inherit" startIcon={<AccountCircleIcon />} onClick={goToProfile}>My Profile</Button>
              <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Button color="inherit" startIcon={<LoginIcon />} onClick={goToLogin}>Login</Button>
              <Button color="inherit" startIcon={<AppRegistrationIcon />} onClick={goToRegister}>Register</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
