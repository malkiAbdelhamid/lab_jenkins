
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" (array of books)
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Read - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Read - Get a book by id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

// Create - Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1, // simple id logic
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update - Modify a book by id
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

// Delete - Remove a book by id
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }
  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
