
const applications = []; // In-memory storage for applications

const getApplications = (req, res) => {
  res.json(applications);
};

const applyToJob = (req, res) => {
  const { jobId } = req.body;
  const token = req.headers.authorization;
  if (token) {
    const username = Buffer.from(token, 'base64').toString('utf8');
    applications.push({ jobId, username });
    res.status(201).json({ message: 'Applied successfully' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { getApplications, applyToJob };
