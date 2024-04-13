import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
//add checkbox from https://mui.com/material-ui/react-checkbox/

const RegisterComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [accountType, setAccountType] = useState('reader');

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Register as:', accountType);
    // add logic to send it to BE
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
        setError('Passwords do not match.');
    } else {
        setError('');
    }
  }, [password, confirmPassword]);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ backgroundColor: '#e8f5e9' }}> 
        <TopAppBar/>
        <AppDrawer/>
        <Box
          component="form"
          sx={{
            backgroundColor: '#e8f5e9',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '25ch' }, 
          }}
          noValidate
          autoComplete="off"
        >
          <TextField required id="outlined-required" label="First Name" name="firstName" />
          <TextField required id="outlined-required" label="Last Name" name="lastName" />
          <TextField id="outlined-required" label="Middle Name" name="middleName" />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
          {isPasswordFocused && (
            <div style={{ marginTop: '8px' }}>
                Password Conditions:
                <ul>
                    <li>Min length 8 characters</li>
                </ul>
            </div>
          )}
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField required id="outlined-required" label="Email" name="email" />
          <TextField required id="outlined-required" label="Username" name="username" />
          <FormControl component="fieldset" style={{ margin: '20px 0' }}>
            <FormLabel component="legend">Register as</FormLabel>
            <RadioGroup
              aria-label="account type"
              name="accountType"
              value={accountType}
              onChange={handleAccountTypeChange}
              style={{ flexDirection: 'column' }}
            >
              <FormControlLabel value="reader" control={<Radio />} label="Reader" />
              <FormControlLabel value="author" control={<Radio />} label="Author" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default RegisterComponent;
