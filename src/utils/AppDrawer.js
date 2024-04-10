import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

const AppDrawer = ({ open, toggleDrawer, searchTerm, handleSearchChange, handleSearch }) => {

  return (
    <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250, backgroundColor: '#b2dfdb' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box sx={{ p: 2 }}>
            <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
                endAdornment: (
                <IconButton onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                ),
            }}
            />
        </Box>
        <List>
          <ListItem>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary="Books" />
          </ListItem>
          <ListItem>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Authors" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;