
const express = require('express');
const router = express.Router();
const { addCompanyInfo, getCompanyInfo,getCompanyInfoById, updateCompanyInfo, deleteCompanyInfo } = require('../controllers/companyController');

router.post('/add', addCompanyInfo); 
router.get('/', getCompanyInfo); 
router.get('/:id', getCompanyInfoById); 
router.put('/:id', updateCompanyInfo); 
router.delete('/:id', deleteCompanyInfo);

module.exports = router;
