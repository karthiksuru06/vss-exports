const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'mahadev.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDb();
    }
});

function initializeDb() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        company TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        email TEXT,
        message TEXT,
        type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
}

// Routes

// Login / Register (Simple Upsert)
app.post('/api/login', (req, res) => {
    const { name, email, phone, company } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            // User exists, return user info
            res.json({ message: 'Welcome back!', user: row });
        } else {
            // Create new user
            const sql = 'INSERT INTO users (name, email, phone, company) VALUES (?, ?, ?, ?)';
            db.run(sql, [name, email, phone, company], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({
                    message: 'Registration successful',
                    user: { id: this.lastID, name, email, phone, company }
                });
            });
        }
    });
});

// Submit Inquiry/Order
app.post('/api/inquire', (req, res) => {
    const { user_id, name, email, message, type } = req.body;

    // If logged in, we expect user_id. If not, we store name/email directly.

    const sql = 'INSERT INTO inquiries (user_id, name, email, message, type) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [user_id || null, name, email, message, type || 'general'], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Inquiry received successfully!', id: this.lastID });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
