const express = require('express');
const router = express.Router();
const JobListing = require('../models/JobListing');

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

        //console.log("Filter applied:", filter); // Log filter to debug
        //console.log("Sort applied:", sortOption); // Log sort to debug

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

module.exports = router;
