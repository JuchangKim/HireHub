require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes here
app.use('/api', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
