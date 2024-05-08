import React, { useState } from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField, Button } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const AppDrawer = () => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    const navigate = useNavigate();
    
    const handleSearch = () => console.log(`Searching for: ${searchTerm}`);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const goToBooks = () => navigate('/books')
    const goToAuthors = () => navigate('/authors')
    return (
        <>
            <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open drawer">
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, backgroundColor: '#b2dfdb', cursor: 'pointer', }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
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
                        <ListItem onClick={goToBooks}>
                            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                            <ListItemText primary="Books" />
                        </ListItem>
                        <ListItem onClick={goToAuthors}>
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Authors" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default AppDrawer;
