// server/routes/jobRoutes.js
const express = require('express');
const { getJobs, getJobById, createJobListing } = require('../controllers/jobController');
const router = express.Router();


// Mock job listings (preserving existing example)
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', description: 'Build amazing software!' },
  { id: 2, title: 'Product Manager', company: 'Biz Inc.', location: 'San Francisco', description: 'Lead product development!' },
];

// Preserve the existing mock data routes
router.get('/mock', (req, res) => {
  res.json(jobs);
});

router.get('/mock/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Use actual controller methods for new routes
router.get('/', getJobs); // Get all jobs from controller
router.get('/:id', getJobById); // Get job by ID from controller
router.post('/', createJobListing); // Post a new job (requires authentication)

const jobController = require('../controllers/jobController');

// Get all job listings
router.get('/', jobController.getJobs);

// Create a new job listing
router.post('/', jobController.createJobListing);

// Get a single job by ID
router.get('/:id', jobController.getJobById);

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
