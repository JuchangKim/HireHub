const express = require('express');
const router = express.Router();
const JobListing = require('../models/JobListing');
const { authenticateToken } = require('../middleware/authenticateToken'); // Import authentication middleware

// Route to get all jobs with filters and sorting
router.get('/jobs', async (req, res) => {
    try {
        const { keyword, region, sector, payRange, workType, sort } = req.query;

        let filter = {};

        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { company: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (region) {
            filter.location = region;
        }

        if (sector) {
            filter.sector = sector;
        }

        if (payRange) {
            filter.salary = payRange;
        }

        if (workType) {
            filter.workType = workType;
        }

        // Default sort option
        let sortOption = { datePosted: -1 }; // Descending by default

        if (sort) {
            if (sort === 'salary') {
                sortOption = { salary: -1 }; // Descending by salary
            } else if (sort === 'title') {
                sortOption = { title: 1 }; // Ascending by title
            } else if (sort === 'datePosted') {
                sortOption = { datePosted: -1 }; // Descending by date posted
            }
        }

        const jobs = await JobListing.find(filter).sort(sortOption);
        res.json(jobs);
    } catch (error) {
        console.error('Server error:', error); // Log error details
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get job details by ID
router.get('/jobs/:id', async (req, res) => {
    try {
        const job = await JobListing.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        console.error('Server error:', error); // Log error details
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to post a new job listing
router.post('/jobs', async (req, res) => {
    try {
        const { title, company, location, salary, sector, workType, description } = req.body;

        // Create a new job listing
        const newJob = new JobListing({
            title,
            company,
            location,
            salary,
            sector,
            workType,
            description,
        });

        // Save the new job listing to the database
        await newJob.save();

        res.status(201).json({ message: 'Job opening posted successfully', job: newJob });
    } catch (error) {
        console.error('Error posting job:', error); // Log error details
        res.status(500).json({ message: 'Error posting job' });
    }
});

// Route to update job by ID
router.put('/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Error updating job' });
    }
});


// Route to delete job by ID
router.delete('/jobs/:id', async (req, res) => {
    try {
        const job = await JobListing.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Error deleting job' });
    }
});

module.exports = router;
