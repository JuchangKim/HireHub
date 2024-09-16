// server/routes/companyRoutes.js
const express = require('express');
const { getCompanyById } = require('../controllers/companyController');
const router = express.Router();

// Get company information
router.get('/:id', getCompanyById);

module.exports = router;
