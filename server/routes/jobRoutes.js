const express = require("express");
const router = express.Router();
const { getJobs, getJobById } = require("../controllers/jobController");

// Get all jobs
router.get("/", getJobs);

// Get job by ID
router.get("/:id", getJobById);

module.exports = router;
