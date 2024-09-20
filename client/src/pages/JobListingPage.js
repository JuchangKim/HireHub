import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';


function JobListingPage() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        region: '',
        sector: '',
        payRange: '',
        workType: '',
    });

    // Fetch jobs with filters
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs', {
                    params: filters
                });
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleClearFilters = () => {
        setFilters({
            region: '',
            sector: '',
            payRange: '',
            workType: '',
        });
    };

    return (
        <Container fluid className="p-4">
            <Row>
                <Col xs={12} md={4} lg={3} className="mb-4">
                    <Form className="filter-form">
                        <Form.Group controlId="formRegion">
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                as="select"
                                name="region"
                                value={filters.region}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select region</option>
                                <option value="Auckland">Auckland</option>
                                <option value="Wellington">Wellington</option>
                                <option value="Christchurch">Christchurch</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSector">
                            <Form.Label>Sector</Form.Label>
                            <Form.Control
                                as="select"
                                name="sector"
                                value={filters.sector}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select sector</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                                <option value="Health">Health</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPayRange">
                            <Form.Label>Pay Range</Form.Label>
                            <Form.Control
                                as="select"
                                name="payRange"
                                value={filters.payRange}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select pay range</option>
                                <option value="40-60k">40-60k</option>
                                <option value="60-80k">60-80k</option>
                                <option value="80-100k">80-100k</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formWorkType">
                            <Form.Label>Work Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="workType"
                                value={filters.workType}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select work type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClearFilters} className="mt-3">Clear Filters</Button>
                    </Form>
                </Col>
                <Col xs={12} md={8} lg={9}>
                    <Row>
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <Col xs={12} md={6} lg={4} key={job._id} className="mb-4">
                                    <Card className="job-card">
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                            <Card.Text>
                                                <strong>Location:</strong> {job.location}<br />
                                                <strong>Salary:</strong> {job.salary}<br />
                                                <strong>Sector:</strong> {job.sector}<br />
                                                <strong>Work Type:</strong> {job.workType}<br />
                                                <strong>Description:</strong> {job.description.substring(0, 100)}...<br />
                                                <strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()} {/* Display datePosted */}
                                            </Card.Text>
                                            <Button variant="primary" href={`/job/${job._id}`}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>No job listings match your criteria. Please adjust your filters.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default JobListingPage;
