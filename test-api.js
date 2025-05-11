const axios = require('axios');

// Base API URL
const API = 'http://localhost:3000';

// Task 10: Get all books using async/await
async function getBooksAsync() {
  try {
    const res = await axios.get(`${API}/books`);
    console.log('Task 10: Get all books (async/await):');
    console.log(res.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Task 11: Get book by ISBN using Promises
function getBookByISBNPromise(isbn) {
  axios.get(`${API}/books/isbn/${isbn}`)
    .then(res => {
      console.log('Task 11: Get book by ISBN (Promise):');
      console.log(res.data);
    })
    .catch(err => console.error(err.message));
}

// Task 12: Get books by Author (async)
async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`${API}/books/author/${author}`);
    console.log('Task 12: Get books by author:');
    console.log(res.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Task 13: Get books by Title (async)
async function getBooksByTitle(title) {
  try {
    const res = await axios.get(`${API}/books/title/${title}`);
    console.log('Task 13: Get books by title:');
    console.log(res.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Call all functions
async function runTasks() {
  await getBooksAsync();
  getBookByISBNPromise('123456789');
  await getBooksByAuthor('john');
  await getBooksByTitle('node');
}

runTasks();
