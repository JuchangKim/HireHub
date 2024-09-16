// client/src/components/PostJobForm.js
import React, { useState } from 'react';
import './PostJobForm.css';  // Import CSS for styling

const PostJobForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        jobType: '',  // New field
        companyWebsite: '',  // New field
        deadline: '',  // New field
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert('Job posted successfully');
            } else {
                alert('Failed to post job. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to post job. Please try again.');
        }
    };

    return (
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
            <button type="submit" className="submit-button">Post Job</button>
        </form>
    );
};

export default PostJobForm;
