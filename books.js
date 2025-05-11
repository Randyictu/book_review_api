const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const auth = require('../middleware/auth');

const booksFile = './data/books.json';

router.get('/', async (req, res) => {
  const data = await fs.readFile(booksFile);
  res.json(JSON.parse(data));
});

router.get('/isbn/:isbn', async (req, res) => {
  const data = JSON.parse(await fs.readFile(booksFile));
  const book = data.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).send('Book not found');
});

router.get('/author/:author', async (req, res) => {
  const data = JSON.parse(await fs.readFile(booksFile));
  const books = data.filter(b => b.author.toLowerCase().includes(req.params.author.toLowerCase()));
  res.json(books);
});

router.get('/title/:title', async (req, res) => {
  const data = JSON.parse(await fs.readFile(booksFile));
  const books = data.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json(books);
});

router.get('/review/:isbn', async (req, res) => {
  const data = JSON.parse(await fs.readFile(booksFile));
  const book = data.find(b => b.isbn === req.params.isbn);
  book ? res.json(book.reviews) : res.status(404).send('Book not found');
});

router.post('/review/:isbn', auth, async (req, res) => {
  const { review } = req.body;
  const username = req.user.username;
  const data = JSON.parse(await fs.readFile(booksFile));
  const book = data.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).send('Book not found');
  book.reviews.push({ username, review });
  await fs.writeFile(booksFile, JSON.stringify(data));
  res.send('Review added');
});

router.put('/review/:isbn', auth, async (req, res) => {
  const { review } = req.body;
  const username = req.user.username;
  const data = JSON.parse(await fs.readFile(booksFile));
  const book = data.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).send('Book not found');
  const userReview = book.reviews.find(r => r.username === username);
  if (!userReview) return res.status(403).send('Review not found');
  userReview.review = review;
  await fs.writeFile(booksFile, JSON.stringify(data));
  res.send('Review updated');
});

router.delete('/review/:isbn', auth, async (req, res) => {
  const username = req.user.username;
  const data = JSON.parse(await fs.readFile(booksFile));
  const book = data.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).send('Book not found');
  book.reviews = book.reviews.filter(r => r.username !== username);
  await fs.writeFile(booksFile, JSON.stringify(data));
  res.send('Review deleted');
});

module.exports = router;
