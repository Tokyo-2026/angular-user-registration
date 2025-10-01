
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use an in-memory database for testing, or a file for development/production
const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : './database.sqlite';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to the ${dbPath === ':memory:' ? 'in-memory' : 'file-based'} SQLite database.`);
});

// Create users table
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, email TEXT UNIQUE, password TEXT)');

// API endpoint for registration
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).send('Missing required fields: fullName, email, password');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)';
    db.run(sql, [fullName, email, hashedPassword], function(err) {
      if (err) {
        return res.status(500).send('Error registering user. Email may already be in use.');
      }
      res.status(201).json({ id: this.lastID, fullName, email });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// API endpoint to get all users
app.get('/users', (req, res) => {
  const sql = "SELECT id, fullName, email FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.json(rows);
  });
});

// Start server only if not in test mode
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export the app and db for testing purposes
module.exports = { app, db };
