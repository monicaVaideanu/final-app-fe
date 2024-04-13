import React, {useState} from 'react';
import {Box, MenuItem, TextField, Button, TableHead,Table, TableRow, TableCell} from '@mui/material';
import TopAppBar from '../utils/TopAppBar'
import AppDrawer from '../utils/AppDrawer';


const BooksComponent = () => {
    const [genre, setGenre] = useState(''); //get from backend
    const [collection, setCollection] = useState(''); //idem
    const [year, setYear] = useState(''); //idem
    const [books, setBooks] = useState([]); //idem
    const [language, setLanguage] = useState('');

    const genres = ['Fiction', 'Non-fiction', 'Drama']; //remove when call is done in be
    const collections = ['Harry Potter', 'Bestsellers', 'New entry']; //idem
    const years = ['2020', '2021', '2022', '2023']; //idem
    const languages= ['Romania', 'English', 'German'];

    const handleSearch = () => {
        // Implementează logica de filtrare a cărților pe baza genului, colecției și anului
        console.log(`Filtering books by genre: ${genre}, collection: ${collection}, and year: ${year}`);
        // Actualizează starea `books` cu rezultatul filtrării
      };
    

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}> 
    <TopAppBar/>
    <AppDrawer/>
    <Box sx ={{m : 4}}>
        <Box sx = {{mb: 2, display: 'flex', gap: 2}}>
            <TextField select label = "Genre" value ={genre} onChange = {(e) => setGenre(e.target.value)} fullWidth>
                {genres.map((option) => (
                    <MenuItem key = {option} value = {option} > {option} </MenuItem>
                )
                )}
            </TextField>
            <TextField select label = "Collection" value ={collection} onChange = {(e) => setCollection(e.target.value)} fullWidth>
                {collections.map((option) => (
                    <MenuItem key = {option} value = {option} > {option} </MenuItem>
                )
                )}
            </TextField>
            <TextField select label = "Year" value ={year} onChange = {(e) => setYear(e.target.value)} fullWidth>
                {years.map((option) => (
                   <MenuItem key = {option} value = {option} >{option} </MenuItem>
                )
                )}
            </TextField>
            <TextField select label = "Language" value ={language} onChange = {(e) => setLanguage(e.target.value)} fullWidth>
                {languages.map((option) => (
                    <MenuItem key = {option} value = {option} >{option} </MenuItem>
                )
                )}
            </TextField>
            <Button variant='contained' onClick={handleSearch}>
                    Search Books
            </Button>
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
        </Table>
    </Box>
    </div>
  )

}

export default BooksComponent;