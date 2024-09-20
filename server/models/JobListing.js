// server/models/JobListing.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    sector: { type: String, required: true },
    workType: { type: String, required: true },
    description: { type: String, required: true},
    datePosted: { type: Date, default: Date.now } // Set default value to current date
});

const JobListing = mongoose.model('JobListing', jobListingSchema);
module.exports = JobListing;