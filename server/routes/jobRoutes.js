// server/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all job listings
router.get('/', jobController.getJobs);

// Create a new job listing
router.post('/', jobController.createJobListing);

// Get a single job by ID
router.get('/:id', jobController.getJobById);

module.exports = router;
