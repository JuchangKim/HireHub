const express = require('express');
const router = express.Router();

// Mock job listings
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', description: 'Build amazing software!' },
  { id: 2, title: 'Product Manager', company: 'Biz Inc.', location: 'San Francisco', description: 'Lead product development!' },
];

// Get all jobs
router.get('/', (req, res) => {
  res.json(jobs);
});

// Get job by ID
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

module.exports = router;
