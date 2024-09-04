const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JobListing = require('../models/JobListing');

dotenv.config();

const uri = 'mongodb+srv://Hirehub:1234567Wa%40%23%24@cluster0.hqn5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const jobs = [
    {
        title: 'Software Engineer',
        company: 'TechCorp',
        location: 'Auckland',
        salary: '80-100k',
        sector: 'IT',
        workType: 'Full-Time',
        description: 'Analyze financial data and create financial models for decision support. Report on financial performance and prepare for regular leadership reviews.',
    },
    {
        title: 'Financial Analyst',
        company: 'FinanceCo',
        location: 'Wellington',
        salary: '60-80k',
        sector: 'Finance',
        workType: 'Full-Time',
        description: 'Analyze financial data and create financial models for decision support. Report on financial performance and prepare for regular leadership reviews.',
    },
    {
        title: 'Registered Nurse',
        company: 'HealthCare Plus',
        location: 'Christchurch',
        salary: '40-60k',
        sector: 'Health',
        workType: 'Part-Time',
        description: 'Analyze financial data and create financial models for decision support. Report on financial performance and prepare for regular leadership reviews.',
    },
    // Add more job entries as needed
];

const seedJobs = async () => {
    try {
        await JobListing.deleteMany(); // Delete all existing jobs
        await JobListing.insertMany(jobs); // Insert the dummy jobs
        console.log('Job data seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding job data:', error);
        mongoose.connection.close();
    }
};

seedJobs();
