// server/app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const jobRoutes = require('./routes/jobRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/jobs', jobRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the HireHub API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
