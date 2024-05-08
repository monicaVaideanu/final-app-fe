import React from 'react';
import {Box, Typography, Container} from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';

const AboutUsComponent = () => {
  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
      <TopAppBar />
      <AppDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px' }}> 
        <Box sx={{ bgcolor: '#ffffff', p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            We are a new app where you can check, and choose your next book to read. 
          </Typography>
          <Typography variant="body1" paragraph>
            If you want to keep track of the books you read and plan your future reads, create an account and get access to your reading list.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default AboutUsComponent;
