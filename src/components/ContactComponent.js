import React from 'react';
import {Box, Typography, Container} from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';

const ContactComponent = () => {
  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
      <TopAppBar />
      <AppDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Box sx={{ bgcolor: '#ffffff', p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or feedback, don't hesitate to reach out to us.
          </Typography>
          <Typography variant="body1" paragraph>
            Name of Application: <strong>Great Reads</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            Email: <a href="mailto:contact@greatreads.com">contact@greatreads.com</a>
          </Typography>
          <Typography variant="body1" paragraph>
            All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default ContactComponent;
