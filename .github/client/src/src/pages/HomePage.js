import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import './HomePage.css';


function HomePage() {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch jobs from API when the component mounts
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    // Filter jobs based on the search term
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="text-center mt-5">
                        <h2>Find Your Next Job</h2>
                        <Form.Control
                            type="text"
                            placeholder="Search jobs, companies, salaries..."
                            className="my-3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" size="lg">Search</Button>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col xs={12} md={10} lg={8}>
                    <h3>Available Jobs</h3>
                    <Row>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <Col key={job._id} xs={12} md={6} lg={4} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                            <Card.Text>
                                                Location: {job.location}<br />
                                                {job.salary && <>Salary: ${job.salary}</>}
                                            </Card.Text>
                                            <Button variant="primary">View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p>No jobs found.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
