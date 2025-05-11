const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3000;

// Import route files
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'secretkey123',
  resave: false,
  saveUninitialized: true
}));

// Register routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Book review API running on http://localhost:${port}`);
});

