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

module.exports = router;
