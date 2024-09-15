const express = require('express');
const { getJobs, getJobById, createJobListing } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs); // Get all jobs from the database
router.get('/:id', getJobById); // Get a job by ID from the database
router.post('/', createJobListing); // Post a new job to the database

module.exports = router;
