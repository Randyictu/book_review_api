const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usersFile = './data/users.json';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  if (users.find(u => u.username === username)) return res.status(409).send('User exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.send('User registered');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ username }, 'jwtSecret');
  res.json({ token });
});

module.exports = router;
