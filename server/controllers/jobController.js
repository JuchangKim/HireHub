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
