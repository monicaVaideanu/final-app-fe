import React, { useState} from 'react';
import {Typography, Button, Box, Container, TextField, IconButton, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TopAppBar from '../utils/TopAppBar'
import AppDrawer from '../utils/AppDrawer';
import axios from 'axios';
const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user/login', {
        username: username,
        password: password
      });
      const jwt = response.data; // Presupunem că răspunsul conține tokenul JWT
      console.log('JWT Token:', jwt);
      // Aici poți salva JWT în local storage sau context pentru utilizare ulterioară
      localStorage.setItem('userToken', jwt);
    } catch (error) {
      setError(error.response.data )
    }
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
              {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
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
