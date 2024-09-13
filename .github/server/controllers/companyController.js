// server/controllers/companyController.js
const Company = require('../models/Company');

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
