const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
require('dotenv').config(); 

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the HireHub API');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
