import React, { useState } from 'react';
import { Typography, Button, Box, Container, TextField, IconButton, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import axios from 'axios';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user/login', {
        username: username,
        password: password
      });
      const { token, userId, role } = response.data; 
      localStorage.setItem('userToken', token);
      localStorage.setItem('userId', userId); 
      localStorage.setItem('role', role);
      console.log(response.data);
      console.log("Role?"+ localStorage.getItem("role"));
      console.log("Setting localStorage - Role:", role);
      localStorage.setItem('role', role);
      console.log("Role stored in localStorage:", localStorage.getItem('role'));
      setLoggedIn(true);
      setError('');
    } catch (error) {
      setLoggedIn(false);
      setError(error.response.data || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}> 
      <TopAppBar />
      <AppDrawer />
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
            {loggedIn && (
              <Typography color="primary" sx={{ mt: 2 }}>
                Logged in successfully!
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