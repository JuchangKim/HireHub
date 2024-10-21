require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 

// news routes
const newsRoutes = require('./routes/newsRoutes');


const companyRoutes = require('./routes/companyRoutes');

const salaryRoutes = require('./routes/salaryRoutes');
const companyRoutes = require('./routes/companyRoutes');
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

// Adding news route
app.use('/api', newsRoutes); 

app.use('/api', reviewRoutes); 

app.use('/api/companies', companyRoutes);

app.use('/api/salary', salaryRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api', newsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
