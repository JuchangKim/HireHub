const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data stores (for demo purposes)
let jobListings = [];
let users = [];

// Routes

// Get all job listings
app.get('/api/jobs', (req, res) => {
    res.json(jobListings);
});

// Create a new job listing
app.post('/api/jobs', (req, res) => {
    const job = req.body;
    jobListings.push(job);
    res.status(201).json(job);
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Register a new user
app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the HireHub API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
