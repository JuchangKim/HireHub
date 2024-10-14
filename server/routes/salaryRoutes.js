const express = require('express');
const router = express.Router();
const Job = require('../models/JobListing'); // Import your Job model

// Endpoint to fetch available roles
router.get('/roles', async (req, res) => {
    try {
        const roles = await Job.distinct('title'); // Get unique job titles
        res.json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint to fetch available industries
router.get('/industries', async (req, res) => {
    try {
        const industries = await Job.distinct('sector'); // Get unique job sectors
        res.json(industries);
    } catch (error) {
        console.error('Error fetching industries:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint to fetch available locations
router.get('/locations', async (req, res) => {
    try {
        const locations = await Job.distinct('location'); // Get unique job locations
        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/estimate', async (req, res) => {
    const { role, industry, location, experience } = req.query;

    try {
        // Build the query based on the selected criteria
        const query = {};
        if (role) query.title = role; // Match job title
        if (industry) query.sector = industry; // Match job sector
        if (location) query.location = location; // Match job location

        // Find jobs that match the query
        const jobs = await Job.find(query);
        console.log('Query:', query); // Log the query
        console.log('Jobs Found:', jobs); // Log the jobs found

        // Handle case where no jobs are found
        if (jobs.length === 0) {
            return res.status(404).json({ 
                message: 'No jobs found matching the criteria. Please adjust your filters and try again.' 
            });
        }

        // Extract and parse salaries from the jobs
        const salaries = jobs.map(job => {
            const salaryRange = job.salary.match(/(\d+)-(\d+)k/); // Match the salary pattern
            if (salaryRange) {
                const minSalary = parseInt(salaryRange[1]) * 1000; // Convert to actual salary
                const maxSalary = parseInt(salaryRange[2]) * 1000; // Convert to actual salary
                return { minSalary, maxSalary };
            }
            return null; // If no valid salary found
        }).filter(salary => salary !== null); // Filter out invalid entries

        // Handle case where all found jobs have invalid salaries
        if (salaries.length === 0) {
            return res.status(404).json({ 
                message: 'No valid salary information found for the jobs. Please check the job listings for valid salaries.' 
            });
        }

        // Calculate overall min and max salaries
        const minSalary = Math.min(...salaries.map(s => s.minSalary));
        const maxSalary = Math.max(...salaries.map(s => s.maxSalary));

        // Adjust based on experience (example logic)
        const adjustedMinSalary = minSalary + (experience ? experience * 2000 : 0);
        const adjustedMaxSalary = maxSalary + (experience ? experience * 4000 : 0);

        // Return the estimated salary
        res.json({
            message: 'Salary estimate calculated successfully.',
            minSalary: adjustedMinSalary,
            maxSalary: adjustedMaxSalary,
        });
    } catch (error) {
        console.error('Error estimating salary:', error);
        res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
    }
});


module.exports = router;
