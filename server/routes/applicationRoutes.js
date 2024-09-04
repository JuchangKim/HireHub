const express = require("express");
const router = express.Router();
const {
  getApplications,
  applyToJob,
} = require("../controllers/applicationController");

// Get all applications
router.get("/", getApplications);

// Apply to job
router.post("/apply", applyToJob);

module.exports = router;
