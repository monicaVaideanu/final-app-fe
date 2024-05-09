import React, { useState, useEffect } from 'react';
import { getAllBooks } from  '../apis/GetData';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks().then(response => {
      // Filtrăm cărțile cu statutul PENDING
      const pendingBooks = response.data.filter(book => book.status === 'PENDING');
      setBooks(pendingBooks);
    }).catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAccept = (bookId) => {
    // Implementează logica pentru a accepta o carte
    console.log(`Accept book with ID: ${bookId}`);
    // Actualizează starea locală sau reîmprospătează lista după acceptare
  };

  const handleReject = (bookId) => {
    // Implementează logica pentru a respinge o carte
    console.log(`Reject book with ID: ${bookId}`);
    // Actualizează starea locală sau reîmprospătează lista după respingere
  };

  return (
    <div>
      <h1>Admin Books Management</h1>
      {books.map((book) => (
        <div key={book.name}>
          <h3>{book.name}</h3>
          <p>{book.description}</p>
          <button onClick={() => handleAccept(book.id)}>Accept</button>
          <button onClick={() => handleReject(book.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminBooksPage;
