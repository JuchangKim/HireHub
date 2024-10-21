require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
<<<<<<< HEAD
// news routes
const newsRoutes = require('./routes/newsRoutes');
=======
<<<<<<< HEAD
const companyRoutes = require('./routes/companyRoutes');
=======
const salaryRoutes = require('./routes/salaryRoutes');
>>>>>>> 327ade07a98c6260a2a2e8c184923453c911f21d

>>>>>>> merge-branch-sprint-2
// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes here
app.use('/api', jobRoutes);
app.use('/api', userRoutes); 
<<<<<<< HEAD
app.use('/api', reviewRoutes);

// Adding news route
app.use('/api', newsRoutes); 
=======
app.use('/api', reviewRoutes); 
<<<<<<< HEAD
app.use('/api/companies', companyRoutes);
=======
app.use('/api/salary', salaryRoutes);
>>>>>>> merge-branch-sprint-2
>>>>>>> 327ade07a98c6260a2a2e8c184923453c911f21d

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
