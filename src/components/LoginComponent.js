import React, { useState } from 'react';
import {Typography, Button, Box, Container, TextField, IconButton, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TopAppBar from '../utils/TopAppBar'
import AppDrawer from '../utils/AppDrawer';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (event) => {
    event.preventDefault();
    // login logic
  };

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}> 
    <TopAppBar/>
    <AppDrawer/>
      <Container maxWidth="xs" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>

      </Container>
    </div>
  );
};

export default LoginComponent;
