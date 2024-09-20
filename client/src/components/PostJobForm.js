// client/src/components/PostJobForm.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PostJobForm.css';

const PostJobForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        jobType: '',
        companyWebsite: '',
        deadline: '',
    });

    const [isPosting, setIsPosting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newJobId, setNewJobId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            const res = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', res.status);
            console.log('Response headers:', res.headers);

            const result = await res.json();
            console.log('Response body:', result);

            if (res.ok) {
                const newJob = result.job;
                console.log('New job:', newJob);

                if (!newJob || !newJob.id) {
                    throw new Error('Invalid job data received from server');
                }

                setFormData({
                    title: '',
                    description: '',
                    company: '',
                    location: '',
                    salary: '',
                    jobType: '',
                    companyWebsite: '',
                    deadline: ''
                });

                setNewJobId(newJob.id);

                setShowModal(true);

            } else {
                alert(`Failed to post job: ${result.error || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to post job. Please try again.');
        }
        setIsPosting(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="post-job-form">
                <div className="form-group">
                    <label>Job Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Job Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Salary (Optional):</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Job Type:</label>
                    <select name="jobType" value={formData.jobType} onChange={handleChange} required>
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Company Website (Optional):</label>
                    <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Application Deadline:</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isPosting}>
                    {isPosting ? 'Posting...' : 'Post Job'}
                </button>
            </form>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Job Posted Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your job has been posted successfully! Would you like to go to the homepage to see it?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Stay Here
                    </Button>
                    <Button variant="primary" onClick={() => window.location.href = '/'}>
                        Go to Homepage
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostJobForm;
