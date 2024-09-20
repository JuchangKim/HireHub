// server/controllers/jobController.js

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', description: 'Develop and maintain software applications.' },
  { id: 2, title: 'Data Scientist', company: 'Data Inc.', description: 'Analyze data and build predictive models.' }
];

const getJobs = (req, res) => {
  res.json(jobs);
};

const getJobById = (req, res) => {
  const job = jobs.find(job => job.id === parseInt(req.params.id));
  if (job) {
      res.json(job);
  } else {
      res.status(404).json({ message: 'Job not found' });
  }
};

// New function to handle job posting
const createJobListing = (req, res) => {
  const { title, company, description, location, salary } = req.body;

  if (!title || !company || !description || !location) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  const newJob = {
      id: jobs.length + 1,
      title,
      company,
      description,
      location,
      salary: salary || 'Not specified', // Optional field
  };

  jobs.push(newJob);
  res.status(201).json({ message: 'Job posted successfully', job: newJob });
};

module.exports = { getJobs, getJobById, createJobListing };
=======

// Hardcoded jobs for example purposes
const jobs = [
    {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        description: 'Develop and maintain software applications.',
        location: 'New York',
        salary: '100000',
        jobType: 'Full-Time'
    },
    {
        id: '2',
        title: 'Data Scientist',
        company: 'Data Inc.',
        description: 'Analyze data and build predictive models.',
        location: 'San Francisco',
        salary: '120000',
        jobType: 'Full-Time'
    }
];

let jobListings = []; // To store new job listings added via the API

exports.createJobListing = (req, res) => {
    const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        companyWebsite,
        deadline
    } = req.body;

    const newJob = {
        id: Date.now().toString(), // Ensure id is a string
        title,
        description,
        company,
        location,
        salary,
        jobType,
        companyWebsite,
        deadline
    };

    jobListings.push(newJob);

    // Log the new job to ensure it has an id
    console.log('New job created:', newJob);

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
};

exports.getJobs = (req, res) => {
    const allJobs = [...jobs, ...jobListings];
    res.status(200).json(allJobs);
};

exports.getJobById = (req, res) => {
    const jobId = req.params.id;

    // Compare ids as strings
    let job = jobs.find(j => j.id === jobId);

    if (!job) {
        job = jobListings.find(j => j.id === jobId);
    }

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
};

