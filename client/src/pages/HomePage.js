// client/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched jobs:', data);
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="text-center mt-5">
                        <h2>Find Your Next Job</h2>
                        <input type="text" placeholder="Search jobs, companies, salaries..." className="form-control my-3" />
                        <Button variant="primary" size="lg">Search</Button>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8}>
                    <h3>Available Jobs</h3>
                    <ListGroup>
                        {jobs.map((job) => (
                            <ListGroup.Item key={job.id}>
                                <h4><Link to={`/job/${job.id}`}>{job.title}</Link></h4>
                                <p><strong>Company:</strong> {job.company}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Description:</strong> {job.description}</p>
                                {job.salary && <p><strong>Salary:</strong> ${job.salary}</p>}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
