const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory/Mock DB for Vercel Deployment (Stateless)
// Note: real persistence requires an external DB like Neon, Supabase, or MongoDB.
const users = [];
const inquiries = [];
let lastUserId = 1;
let lastInquiryId = 1;

// Routes
// Login / Register (Simple Upsert - Mock)
app.post('/api/login', (req, res) => {
    const { name, email, phone, company } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        res.json({ message: 'Welcome back!', user: existingUser });
    } else {
        const newUser = { id: lastUserId++, name, email, phone, company, created_at: new Date() };
        users.push(newUser);
        res.json({
            message: 'Registration successful',
            user: newUser
        });
    }
});

// Submit Inquiry/Order (Mock)
app.post('/api/inquire', (req, res) => {
    const { user_id, name, email, message, type } = req.body;

    const newInquiry = {
        id: lastInquiryId++,
        user_id: user_id || null,
        name,
        email,
        message,
        type: type || 'general',
        created_at: new Date()
    };
    inquiries.push(newInquiry);

    console.log("New Inquiry Received:", newInquiry);

    res.json({ message: 'Inquiry received successfully!', id: newInquiry.id });
});

// Default route
app.get('/api', (req, res) => {
    res.send("VV Marine API is running");
});

// Export for Vercel
module.exports = app;
