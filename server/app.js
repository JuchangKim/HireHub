require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
// JC - Adding newsRoutes to handle news and news comments
const newsRoutes = require('./routes/newsRoutes');

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes here
app.use('/api', jobRoutes);
app.use('/api', userRoutes); 
app.use('/api', reviewRoutes);

// JC - Adding newsRoutes to handle news and news comments
app.use('/api', newsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
