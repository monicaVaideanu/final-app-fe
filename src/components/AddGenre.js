import React, { useState } from 'react';
import { TextField, Button, Container, Box, Paper, Snackbar } from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { addNewGenre, addNewCollection } from '../apis/GetData';

const AddGenreAndCollection = () => {
    const [genreName, setGenreName] = useState('');
    const [description, setDescription] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const token = localStorage.getItem('userToken');

    const handleSubmitGenre = async (event) => {
        event.preventDefault();
        const genreData = {
            genreName: genreName.trim(),
            description: description.trim()
        };
        
        if (validateGenre()) {
            addNewGenre(genreData, token)
            .then(response => {
                setResponseMessage(response.data);
                setOpenSnackbar(true);
                setGenreName('');
                setDescription('');
                setErrors({});
            })
            .catch(error => {
                const errorMessage = error.response && error.response.data && error.response.data 
                                     ? error.response.data 
                                     : 'Failed to add genre';
                setResponseMessage(errorMessage);
                setOpenSnackbar(true);
            });
        }
    };

    const handleSubmitCollection = async (event) => {
        event.preventDefault();
        const collectionDto = {
            name: collectionName.trim()
        };
        
        if (validateCollection()) {
            addNewCollection(collectionDto, token)
            .then(response => {
                setResponseMessage(response.data);
                setOpenSnackbar(true);
                setCollectionName('');
                setErrors({});
            })
            .catch(error => {
                const errorMessage = error.response && error.response.data && error.response.data 
                                     ? error.response.data 
                                     : 'Failed to add collection';
                setResponseMessage(errorMessage);
                setOpenSnackbar(true);
            });
        }
    };

    const validateGenre = () => {
        let tempErrors = {};
        tempErrors.genreName = genreName ? '' : 'Name cannot be blank.';
        tempErrors.description = description ? '' : 'Description cannot be blank.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const validateCollection = () => {
        let tempErrors = {};
        tempErrors.collectionName = collectionName ? '' : 'Collection name cannot be blank.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#e8f5e9' }}>
            <TopAppBar />
            <AppDrawer />
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                <Container maxWidth="sm">
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                        <form onSubmit={handleSubmitGenre}>
                            <TextField
                                label="Genre Name"
                                variant="outlined"
                                value={genreName}
                                onChange={e => setGenreName(e.target.value)}
                                error={!!errors.genreName}
                                helperText={errors.genreName}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Add Genre
                            </Button>
                        </form>
                        <form onSubmit={handleSubmitCollection}>
                            <TextField
                                label="Collection Name"
                                variant="outlined"
                                value={collectionName}
                                onChange={e => setCollectionName(e.target.value)}
                                error={!!errors.collectionName}
                                helperText={errors.collectionName}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="secondary">
                                Add Collection
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={responseMessage}
            />
        </div>
    );
}

export default AddGenreAndCollection;
