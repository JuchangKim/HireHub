const JobListing = require('../models/JobListing');

// Function to create and store a new job listing
exports.createJobListing = async (req, res) => {
    const { title, description, company, location, salary, jobType, companyWebsite, deadline } = req.body;

    try {
        const job = new JobListing({
            title,
            description,
            company,
            location,
            salary,
            jobType,
            companyWebsite,
            deadline,
        });
        await job.save();  // Store the job in MongoDB
        res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Function to get all job listings
exports.getJobs = async (req, res) => {
    try {
        const jobs = await JobListing.find();  // Fetch all jobs from MongoDB
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not retrieve jobs.' });
    }
};

// Function to get a job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await JobListing.findById(req.params.id);  // Fetch the job by ID from MongoDB
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not retrieve the job.' });
    }
};
