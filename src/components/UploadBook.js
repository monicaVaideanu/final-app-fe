import React, { useState, useEffect} from 'react';
import { Button, TextField, Container, Typography, Box, Input, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { getCollections, getGenres, getLanguages } from '../apis/GetData';

const UploadBook = () => {
    const [bookData, setBookData] = useState({
        name: '',
        description: '',
        availableToDownload: false,
        yearPublication: '',
        publisher: '',
        avrRating: 0.0,
        pdfContent: null,
        genres: [],
        languages: [],
        collections: [],
        authors: []
    });
    
    const [genre, setGenre] = useState('');
    const [collection, setCollection] = useState('');
    const [language, setLanguage] = useState(''); 
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState('');
    const [fetchedGenres, setFetchedGenres] = useState([]);
    const [fetchedCollections, setFetchedCollections] = useState([]);
    const [fetchedLanguages, setFetchedLanguages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };
    const handleAuthorChange = (index, field, value) => {
        const updatedAuthors = authors.map((author, i) => {
            if (i === index) {
                return { ...author, [field]: value };
            }
            return author;
        });
        setAuthors(updatedAuthors);
    };

    const addAuthor = () => {
        setAuthors([...authors, { firstName: '', lastName: '' }]);
    };

    const removeAuthor = (index) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresResponse, collectionsResponse, languagesResponse] = await Promise.all([
                    getGenres(),
                    getCollections(),
                    getLanguages()
                ]);

                setFetchedGenres(genresResponse.data);
                setFetchedCollections(collectionsResponse.data);
                setFetchedLanguages(languagesResponse.data);
            } catch (fetchError) {
                console.error('Error fetching data:', fetchError);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e) => {
        setBookData({
            ...bookData,
            pdfContent: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("BookData" + bookData)
        formData.append('bookDto', new Blob([JSON.stringify(bookData)], { type: "application/json" }));
        if (bookData.pdfContent) {
            formData.append('file', bookData.pdfContent);
        }
        console.log("FormData" + formData)
        try {
            const response = await axios.post('http://localhost:8081/book/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${localStorage.getItem('userToken')}`, 
                },
            });
            alert('Book uploaded successfully!');
        } catch (error) {
            alert('Failed to upload book: ' + error.response.data);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Typography component="h1" variant="h5">Upload New Book</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && (
                <Typography color="error">{error}</Typography>
            )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Book Name"
                    name="name"
                    autoFocus
                    value={bookData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    value={bookData.description}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="publisher"
                    label="Publisher"
                    id="publisher"
                    value={bookData.publisher}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="downloadable-label">Available to Download</InputLabel>
                    <Select
                        labelId="downloadable-label"
                        id="availableToDownload"
                        value={bookData.availableToDownload}
                        label="Available to Download"
                        onChange={(e) => handleInputChange({ target: { name: 'availableToDownload', value: e.target.value === 'true' }})}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="yearPublication"
                    label="Year of Publication"
                    type="number"
                    inputProps={{ min: 1900, max: new Date().getFullYear() }}
                    id="yearPublication"
                    value={bookData.yearPublication}
                    onChange={handleInputChange}
                />
                <TextField
                        select
                        label="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        fullWidth
                    >
                        {fetchedGenres.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Collection"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        fullWidth
                    >
                        {fetchedCollections.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        fullWidth
                    >
                        {fetchedLanguages.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                <Input
                    accept="application/pdf"
                    style={{ marginTop: 20 }}
                    id="pdfContent"
                    type="file"
                    onChange={handleFileChange}
                />
                 {authors.map((author, index) => (
                    <Box key={index}>
                        <TextField
                            label="First Name"
                            value={author.firstName}
                            onChange={(e) => handleAuthorChange(index, 'firstName', e.target.value)}
                            required
                        />
                        <TextField
                            label="Last Name"
                            value={author.lastName}
                            onChange={(e) => handleAuthorChange(index, 'lastName', e.target.value)}
                            required
                        />
                        <Button onClick={() => removeAuthor(index)}>Remove</Button>
                    </Box>
                ))}
                <Button onClick={addAuthor}>Add Author</Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Upload Book
                </Button>
            </Box>
        </Container>
    );
};

export default UploadBook;
