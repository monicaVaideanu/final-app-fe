import React, { useEffect, useState } from 'react';
import {Divider, Box, Typography, Paper, TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Container, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarRateIcon from '@mui/icons-material/StarRate';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getBook, getReviewsForBook } from '../apis/GetData';
import { useParams } from 'react-router-dom';

const Book = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const id = Number(bookId);
        if (!isNaN(id)) {
            getBook(id).then(response => {
                setBook(response.data);
            }).catch(e => {
                console.error("Error fetching book:", e);
            });

            getReviewsForBook(id).then(response => {
                setReviews(response.data)
            }).catch(e => {
                console.error("Error fetching reviews:", e);
                setReviews([]);
            });
        }
    }, [bookId]);

    return (
        <div style={{ backgroundColor: '#e8f5e9' }}>
            <TopAppBar />
            <AppDrawer />
            <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px' }}>
                    <TableContainer>
                        <Table aria-label="Book Details Table">
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Name</Typography></TableCell>
                                    <TableCell>{book ? book.name : 'Loading...'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Description</Typography></TableCell>
                                    <TableCell>{book ? book.description : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Year of Publication</Typography></TableCell>
                                    <TableCell>{book ? book.yearPublication : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Publisher</Typography></TableCell>
                                    <TableCell>{book ? book.publisher : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Average Rating</Typography></TableCell>
                                    <TableCell>{book ? book.avrRating : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Available to Download</Typography></TableCell>
                                    <TableCell>{book ? (book.availableToDownload ? 'Yes' : 'No') : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Genres</Typography></TableCell>
                                    <TableCell>{book ? book.genres.map(g => g.genreName).join(", ") : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Languages</Typography></TableCell>
                                    <TableCell>{book ? book.languages.map(l => l.languageName).join(", ") : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Collection</Typography></TableCell>
                                    <TableCell>{book && book.collection ? book.collection.name : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><Typography fontWeight="bold">Authors</Typography></TableCell>
                                    <TableCell>{book && book.authors.length > 0 ? book.authors.map(a => `${a.firstName} ${a.lastName}`).join(", ") : 'N/A'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider style={{ margin: '20px 0' , backgroundColor: '#e8f5e9' }} />
                    <Typography variant="h6" style={{ margin: '20px 0' }}>Reviews</Typography>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <Box key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                <Typography variant="subtitle1"><strong>User:  {review.username}</strong> ({new Date(review.publishedDate).toLocaleDateString()})</Typography>
                                <Typography>{review.reviewText}</Typography>
                                <Box display="flex" alignItems="center">
                                    <StarRateIcon color="primary" />
                                    <Typography variant="caption"> {review.rating}</Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography style={{ padding: '10px' }}>No ratings available for this book.</Typography>
                    )}
                </Paper>
            </Container>
        </div>
    );
}

export default Book;
