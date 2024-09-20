require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

// Connect to MongoDB
connectDB();

// Import routes
const jobRoutes = require('./routes/jobRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/jobs', jobRoutes);

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data stores (for demo purposes)
let jobListings = [];
let users = [];
let companyReviews = []; // In-memory storage for company reviews

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


// Get all company reviews
app.get('/api/reviews', (req, res) => {
    res.json(companyReviews);
});

// Add a new company review
app.post('/api/reviews', (req, res) => {
    const review = req.body;
    companyReviews.push(review);
    res.status(201).json({ message: 'Review added successfully', review });
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the HireHub API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Define routes here
app.use("/api", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
