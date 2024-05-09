import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import axios from 'axios';
import { sendNewAuthor, sendNewUser } from '../apis/GetData';

const RegisterComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [accountType, setAccountType] = useState('reader');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [isAuthorSelected, setIsAuthorSelected] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleAccountTypeChange = (event) => {
    const selectedType = event.target.value;
    setAccountType(selectedType);
    if (selectedType === 'author') {
      setIsAuthorSelected(true);
    } else {
      setIsAuthorSelected(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage(''); 
    const formData = {
      firstName: event.target.firstName.value.trim(),
      lastName: event.target.lastName.value.trim(),
      middleName: event.target.middleName.value.trim(),
      email: event.target.email.value.trim(),
      username: event.target.username.value.trim(),
      password: password.trim(),
      description: description.trim(),
      country: country.trim()
    };

    if (accountType === 'author') {
      if (!formData.username || !formData.lastName || !formData.email || !formData.firstName) {
        setError('All fields must be filled out.');
        return;
      }
  
      try {
        const response = await sendNewAuthor(formData);
        console.log('Author created successfully:', response);
        setSuccessMessage('Author created successfully!');
      } catch (error) {
        if (error.response) {
          console.error('Error creating author:', error.response.data);
          setError(error.response.data);
        } else {
          console.error('Error creating author:', error.message);
          setError('An error occurred');
        }
      }
    } else {
      const newUser = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        middleName: event.target.middleName.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: password
      };
      console.log('Preparing to send user data:', newUser);
      try {
        const response = await sendNewUser(newUser);
        console.log('User created successfully:', response);
        setSuccessMessage('User created successfully!');
      } catch (error) {
        if (error.response) {
          console.error('Error creating user:', error.response.data);
          setError(error.response.data);
        } else {
          console.error('Error creating user:', error.message);
          setError('An error occurred');
        }
      }
    }
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isAuthorSelected && (!description || !country)) {
      setError('Description and country are required fields.');
    } else {
      setError('');
    }
  }, [isAuthorSelected, description, country]);

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}> 
        <TopAppBar/>
        <AppDrawer/>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Box
              sx={{
                backgroundColor: '#e8f5e9',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '25ch' }, 
              }}
            >
              {error && (
                <div style={{ color: 'red', margin: '10px' }}>{error}</div>
              )}
              {successMessage && (
                <div style={{ color: 'green', margin: '10px' }}>{successMessage}</div>
              )}
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
              {isAuthorSelected && (
                <div>
                  <TextField required id="outlined-required" label="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <TextField required id="outlined-required" label="Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              )}
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Box>
        </form>
    </div>
  );
};

export default RegisterComponent;
