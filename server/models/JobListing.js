
const mongoose = require('mongoose');

const JobListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    jobType: { type: String },
    companyWebsite: { type: String },
    deadline: { type: Date },
    datePosted: { type: Date, default: Date.now }
});

const JobListing = mongoose.model('JobListing', JobListingSchema);
module.exports = JobListing;
