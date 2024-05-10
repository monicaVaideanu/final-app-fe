import React, { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getAllBooks, getCollections, getGenres, getLanguages } from '../apis/GetData';
import Footer from '../utils/Footer';

const BooksComponent = () => {
    const [genre, setGenre] = useState('');
    const [collection, setCollection] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [language, setLanguage] = useState('');
    const [error, setError] = useState('');
    const [fetchedGenres, setFetchedGenres] = useState([]);
    const [fetchedCollections, setFetchedCollections] = useState([]);
    const [fetchedLanguages, setFetchedLanguages] = useState([]);

    const handleSearch = () => {
        let filteredBooks = allBooks;
    
        console.log("Starting filter on books:", allBooks);
    
        if (genre && genre !== 'All') {
            filteredBooks = filteredBooks.filter(book =>
                book.genres && book.genres.some(g => g.genreName === genre));
            console.log("After genre filter:", filteredBooks);
        }
        if (collection && collection !== 'All') {
            filteredBooks = filteredBooks.filter(book =>
                book.collection && book.collection.name === collection);
            console.log("After collection filter:", filteredBooks);
        }
        if (language && language !== 'All') {
            filteredBooks = filteredBooks.filter(book =>
                book.languages && book.languages.some(l => l.languageName === language));
            console.log("After language filter:", filteredBooks);
        }
        setDisplayBooks(filteredBooks);
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresResponse, collectionsResponse, languagesResponse, booksResponse] = await Promise.all([
                    getGenres(),
                    getCollections(),
                    getLanguages(),
                    getAllBooks()
                ]);

                setFetchedGenres(genresResponse.data);
                setFetchedCollections(collectionsResponse.data);
                setFetchedLanguages(languagesResponse.data);
                console.log(languagesResponse.data)
                setAllBooks(booksResponse.data || []);
                setDisplayBooks(booksResponse.data || []);
            } catch (fetchError) {
                console.error('Error fetching data:', fetchError);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#e8f5e9' }}>
            <TopAppBar />
            <AppDrawer />
            <Box sx={{ m: 4 }}>
                <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
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
                    <Button variant='contained' onClick={handleSearch}>Search Books</Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Authors</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Collection</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayBooks.map((book, index) => (
                            <TableRow key={index}>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.authors.map(author => `${author.firstName} ${author.lastName}`).join(", ")}</TableCell>
                                <TableCell>{book.genres.map(g => g.genreName).join(", ")}</TableCell>
                                <TableCell>{book.collection ? book.collection.name : 'No Collection'}</TableCell>
                                <TableCell>{book.languages.map(l => l.code).join(", ")}</TableCell>
                                <TableCell>{book.yearPublication}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
};
export default BooksComponent;