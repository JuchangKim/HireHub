const JobListing = require('../models/JobListing');
const getJobs = async (req, res) => {
    try {
        const jobs = await JobListing.find(); 
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};


const getJobById = async (req, res) => {
    try {
        const job = await JobListing.findById(req.params.id); 
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Error fetching job' });
    }
};


const updateJob = async (req, res) => {
    try {
        const updatedJob = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Error updating job' });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await JobListing.findByIdAndDelete(req.params.id); 
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Error deleting job' });
    }
};

module.exports = { getJobs, getJobById, updateJob, deleteJob };
