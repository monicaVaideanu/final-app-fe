import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Button, TextField, Divider, Box, Typography, Paper, TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Container } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import { getBook, getReviewsForBook, addReview } from '../apis/GetData';
import { useParams, useNavigate} from 'react-router-dom';
import axios from "axios";

const Book = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

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

    const handleDeleteBook = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await axios.delete(`http://localhost:8081/book/delete/${bookId}`, {
                    headers: { Authorization: `${token}` }
                });
                console.log(response.data);
                alert('Book deleted successfully!');
                navigate('/')
            } catch (error) {
                console.error('Failed to delete book:', error);
                alert('Failed to delete book');
            }
        }
    };
    const handleDeleteReview = async (reviewUserId, reviewBookId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                const response = await axios.delete(`http://localhost:8081/book/review/${reviewUserId}/${reviewBookId}`, {
                    headers: { Authorization: `${token}` }
                });
                console.log(response.data);
                alert('Review deleted successfully!');
                setReviews(reviews.filter(review => review.userId !== reviewUserId || review.bookId !== reviewBookId));
            } catch (error) {
                console.error('Failed to delete review:', error);
                alert('Failed to delete review');
            }
        }
    };

    const handleAddToWishlist = async () => {
        const data = {
            userId: parseInt(localStorage.getItem('userId'), 10),
            bookId: parseInt(bookId, 10),
            wish: "WISH"
        };

        try {
            const response = await axios.post('http://localhost:8081/books/list/addBook', data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });
            alert('Book added to wishlist successfully!');
        } catch (error) {
            console.error('Failed to add book to wishlist:', error);
            alert('Failed to add book to wishlist');
        }
    };

    const handleDownload = async () => {
        if (!token) {
            alert('Please log in to download the book.');
            return;
        }

        if (!book.availableToDownload) {
            alert('This book is not available for download.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8081/book/download/${bookId}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `${token}`
                }
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `book_${bookId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            alert('Book downloaded successfully!');
        } catch (error) {
            console.error('Failed to download book:', error);
            alert('Failed to download book');
        }
    };
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert('Please log in to submit a review.');
            return;
        }

        const reviewDto = {
            rating,
            reviewText,
            bookId: parseInt(bookId),
            userId: userId
        };

        try {
            await addReview(bookId, userId, reviewDto, token);
            setReviews([...reviews, { ...reviewDto }]);
            setReviewText('');
            setRating(1);
            alert('Review added successfully!');
        } catch (error) {
            console.error('Failed to add review:', error);
            if (error.response && error.response.data) {
                alert(`Failed to submit review: ${error.response.data}`);
            } else {
                alert('Failed to submit review due to server error');
            }
        }
    };

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
                                    {token && (
                                        <Button                                            
                                        color="primary"
                                        size="small"
                                        variant="contained"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={handleAddToWishlist}
                                            sx={{ marginTop: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}}>
                                            Add Book to Wishlist
                                        </Button>
                                    )}
                                    {userRole === 'ADMIN' && (
                                    <TableRow>
                                        <TableCell>
                                            <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteBook}>
                                                Delete Book
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
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
                                    <TableCell>
                                        {book && book.availableToDownload && token && (
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="contained"
                                                onClick={handleDownload}
                                                startIcon={<DownloadIcon />}
                                                sx={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' } }}
                                            >
                                                Download
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} style={{ borderBottom: 'none' }}>
                                        <Divider style={{ margin: '20px 0', backgroundColor: '#8BC34A', height: '2px' }} />
                                        <Typography variant="h6" style={{ margin: '20px 0' }}>Reviews</Typography>
                                        {reviews.length > 0 ? (
                                            reviews.map((review, index) => (
                                                <Box key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                                    <Typography variant="subtitle1"><strong>User: {review.username}</strong> ({new Date(review.publishedDate).toLocaleDateString()})</Typography>
                                                    <Typography>{review.reviewText}</Typography>
                                                    <Box display="flex" alignItems="center">
                                                        <StarRateIcon color="primary" />
                                                        <Typography variant="caption"> {review.rating}</Typography>
                                                    </Box>
                                                    {token && userRole === 'ADMIN' && (
                                                        <Button key={review.id} color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDeleteReview(review.userId, review.bookId)}>
                                                            Delete Review
                                                        </Button>
                                                    )}
                                                </Box>
                                            ))
                                        
                                        ) : (
                                            <Typography style={{ padding: '10px' }}>No ratings available for this book. If you are logged in you can add the first review of this book.</Typography>
                                        )}
                                        
                                        <form onSubmit={handleReviewSubmit}>
                                            <Select
                                                label="Your Rating (0.1-5.0)"
                                                fullWidth
                                                value={rating}
                                                onChange={e => setRating(parseFloat(e.target.value))}
                                                variant="outlined"
                                                margin="normal"
                                                sx={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}
                                            >
                                                {[...Array(50).keys()].map(value => (
                                                    <MenuItem key={value} value={value / 10}>{(value / 10).toFixed(1)}</MenuItem>
                                                ))}
                                            </Select>
                                            <TextField
                                                label="Your Review"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                value={reviewText}
                                                onChange={e => setReviewText(e.target.value)}
                                                variant="outlined"
                                                margin="normal"
                                                sx={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}
                                            />
                                            <Button type="submit" color="primary" variant="contained" sx={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>Submit Review</Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                                <TableRow style={{ display: 'none' }} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>
    );
}

export default Book;
