import React, { useEffect, useState } from 'react';
import { Typography, Paper,Grid, Container, TableBody, TableCell, TableContainer, Table, TableHead, TableRow } from '@mui/material';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getBook } from '../apis/GetData';
import { useParams } from 'react-router-dom';

const Book = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        getBook().then((response) => {
            setBook(response.data)
            console.log(response.data)
        }).catch((e) => {
            console.log(e.request)
        })
    },[]
    );
}
export default Book;