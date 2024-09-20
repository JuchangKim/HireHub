
const jobs = [ // In-memory job listings
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
  
  module.exports = { getJobs, getJobById };
  