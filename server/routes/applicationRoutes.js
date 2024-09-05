const express = require("express");
const router = express.Router();
const {
  getApplications,
  applyToJob,
} = require("../controllers/applicationController");

router.get("/", getApplications);
router.post("/apply", applyToJob);

module.exports = router;
