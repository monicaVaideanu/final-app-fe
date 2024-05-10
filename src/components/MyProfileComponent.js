import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableHead, TableRow,
  Button, Select, MenuItem, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TopAppBar from '../utils/TopAppBar';
import AppDrawer from '../utils/AppDrawer';
import {getWishList, deleteFromWishList, updateStatusForBook, deleteAllWishListByUser, promoteToAuthor} from '../apis/GetData';

const ConfirmDialog = ({ open, handleClose, handleConfirm }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Please confirm or dismiss your action</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete all books from your list?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleConfirm} color="primary" autoFocus>Confirm</Button>
    </DialogActions>
  </Dialog>
);

const formatDate = (dateString) => {
  if (!dateString) return "N/A"; 
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const MyProfile = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [promotionDialogOpen, setPromotionDialogOpen] = useState(false);
  const [promotionData, setPromotionData] = useState({ description: '', country: '' });
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const fetchWishBooks = async () => {
    try {
      const response = await getWishList(userId, token);
      setBooks(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleUploadBook = () => {
    navigate('/upload');
  };
  const handleAdminPage = () => {
    navigate('/adminPage')
  };
  useEffect(() => {
    fetchWishBooks();
  }, [userId]);

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteFromWishList(userId, token, bookId);
      fetchWishBooks();
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  const handleUpdateStatus = async (bookId, newWish) => {
    try {
      await updateStatusForBook(userId, token, bookId, newWish);
      fetchWishBooks();
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Failed to update book status', error);
      alert('Failed to update status!');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllWishListByUser(userId, token);
      setDialogOpen(false);
      alert('The list has been deleted.');
      fetchWishBooks(); 
    } catch (error) {
      console.error('Failed to delete all wish lists', error);
      alert('Error.');
    }
  };

  const handlePromoteToAuthor = async () => {
    try {
      await promoteToAuthor(userId, token, promotionData);
      setPromotionDialogOpen(false);
      alert('Successfully promoted to author!');
    } catch (error) {
      console.error('Failed to promote to author', error);
      alert('Failed to promote!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPromotionData(prevState => ({ ...prevState, [name]: value }));
  };

  const statusOptions = ['WISH', 'DONE_READING', 'READING'];

  return (
    <div style={{ backgroundColor: '#e8f5e9' }}>
      <TopAppBar />
      <AppDrawer />
      <Container maxWidth="xs" style={{ marginTop: '20px' }}>
        <h1>My Profile - Wish and Read List</h1>
        {userRole === 'READER' && (
          <Button onClick={() => setPromotionDialogOpen(true)} color="primary">
            Become an author
          </Button>
        )}
        {(userRole === 'AUTHOR' || userRole === 'ADMIN') && (
          <Button onClick={handleUploadBook} color="primary" variant="contained">
            Upload a Book
          </Button>
        )}
        {(userRole === 'ADMIN') && (
          <Button onClick={handleAdminPage} color="primary" variant="contained">
            Check pending books
          </Button>
        )}
        <Button onClick={() => setDialogOpen(true)} color="secondary">Delete all list</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Added Date</TableCell>
              <TableCell>Start Reading Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(books) && books.map((book) => (
              <TableRow key={book.bookId.bookId}>
                <TableCell>{book.bookId.name}</TableCell>
                <TableCell>{(book.bookId.authors && book.bookId.authors.map(author => author.name).join(", ")) || "No authors listed"}</TableCell>
                <TableCell>{formatDate(book.addDate)}</TableCell>
                <TableCell>{formatDate(book.startReadingDate)}</TableCell>
                <TableCell>
                  <Select
                    value={book.wish}
                    onChange={(event) => handleUpdateStatus(book.bookId.bookId, event.target.value)}
                    displayEmpty
                  >
                    {statusOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteBook(book.bookId.bookId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          handleConfirm={handleDeleteAll}
        />
        <Dialog open={promotionDialogOpen} onClose={() => setPromotionDialogOpen(false)}>
          <DialogTitle>Become an author</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="description"
              label="Author Description"
              type="text"
              fullWidth
              value={promotionData.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="country"
              label="Country"
              type="text"
              fullWidth
              value={promotionData.country}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPromotionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePromoteToAuthor} color="primary">Confirm</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default MyProfile;
