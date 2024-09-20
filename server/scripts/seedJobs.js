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
        salary: '80-90k',
        sector: 'IT',
        workType: 'Full-Time',
        description: 'Develop and maintain software applications. Work closely with product teams to deliver high-quality software solutions.',
        datePosted: new Date('2024-09-01')
    },
    {
        title: 'Financial Analyst',
        company: 'FinanceCo',
        location: 'Wellington',
        salary: '60-70k',
        sector: 'Finance',
        workType: 'Full-Time',
        description: 'Analyze financial data and create financial models for decision support. Report on financial performance and prepare for regular leadership reviews.',
        datePosted: new Date('2024-08-15')
    },
    {
        title: 'Registered Nurse',
        company: 'HealthCare Plus',
        location: 'Christchurch',
        salary: '40-50k',
        sector: 'Health',
        workType: 'Part-Time',
        description: 'Provide patient care and support in a healthcare facility. Collaborate with healthcare professionals to deliver quality patient care.',
        datePosted: new Date('2024-08-20')
    },
    {
        title: 'Civil Engineer',
        company: 'BuildNZ',
        location: 'Hamilton',
        salary: '70-80k',
        sector: 'Engineering',
        workType: 'Full-Time',
        description: 'Plan, design, and oversee construction projects including roads, bridges, and infrastructure.',
        datePosted: new Date('2024-08-25')
    },
    {
        title: 'Marketing Manager',
        company: 'AdPro',
        location: 'Dunedin',
        salary: '90-100k',
        sector: 'Marketing',
        workType: 'Full-Time',
        description: 'Lead marketing campaigns and strategies to increase brand visibility and customer engagement.',
        datePosted: new Date('2024-09-05')
    },
    {
        title: 'Electrician',
        company: 'PowerUp Services',
        location: 'Tauranga',
        salary: '50-60k',
        sector: 'Trades',
        workType: 'Full-Time',
        description: 'Install, maintain, and repair electrical systems in residential and commercial buildings.',
        datePosted: new Date('2024-08-30')
    },
    {
        title: 'Teacher',
        company: 'LearnNZ',
        location: 'Napier',
        salary: '40-50k',
        sector: 'Education',
        workType: 'Full-Time',
        description: 'Teach primary school students and create lesson plans to meet educational objectives.',
        datePosted: new Date('2024-08-10')
    },
    {
        title: 'Chef',
        company: 'Taste of NZ',
        location: 'Queenstown',
        salary: '50-60k',
        sector: 'Hospitality',
        workType: 'Full-Time',
        description: 'Prepare and cook meals in a high-end restaurant. Work with a team to deliver a high-quality dining experience.',
        datePosted: new Date('2024-09-03')
    }
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
