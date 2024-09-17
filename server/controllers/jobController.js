// server/controllers/jobController.js

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
