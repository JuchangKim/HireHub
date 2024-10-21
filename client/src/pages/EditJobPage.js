import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditJobPage.css';

function EditJobPage() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
            } catch (err) {
                setError('Error fetching jobs');
            }
        };
        fetchJobs();
    }, []);

    const handleEdit = (jobId) => {
        navigate(`/editjob/${jobId}`); 
    };

    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) { 
            try {
                await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
                setSuccess("Job deleted successfully.");
                setJobs(jobs.filter(job => job._id !== jobId)); 
            } catch (err) {
                setError("Error deleting job");
            }
        }
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Edit Job Listings</h2>
            {success && <Alert variant="success">{success}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                            <td>{job.salary}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(job._id)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(job._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default EditJobPage;
