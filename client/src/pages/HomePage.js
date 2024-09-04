import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import './HomePage.css'; // Import custom CSS for additional styling

function HomePage() {
    const [latestJobs, setLatestJobs] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    // Fetch latest jobs
    useEffect(() => {
        const fetchLatestJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setLatestJobs(response.data);
            } catch (error) {
                console.error('Error fetching latest jobs:', error);
            }
        };

        fetchLatestJobs();
    }, []);

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/jobs', {
                params: { keyword: searchKeyword }
            });
            setLatestJobs(response.data);
        } catch (error) {
            console.error('Error searching jobs:', error);
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <div className="text-center mt-4 mb-5">
                        <h1 className="display-4">Find Your Next Job</h1>
                        <Form>
                            <Form.Group controlId="searchKeyword">
                                <Form.Control
                                    type="text"
                                    value={searchKeyword}
                                    onChange={handleSearchChange}
                                    placeholder="Search jobs, companies, salaries..."
                                    className="search-bar"
                                />
                            </Form.Group>
                            <Button variant="primary" size="lg" onClick={handleSearch} className="mt-3">Search</Button>
                        </Form>
                    </div>
                    <Row>
                        {latestJobs.length > 0 ? (
                            latestJobs.map(job => (
                                <Col xs={12} md={6} lg={4} key={job._id} className="mb-4">
                                    <Card className="job-card">
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                            <Card.Text>
                                                <strong>Location:</strong> {job.location}<br />
                                                <strong>Salary:</strong> {job.salary}<br />
                                                <strong>Sector:</strong> {job.sector}<br />
                                                <strong>Work Type:</strong> {job.workType}
                                            </Card.Text>
                                            <Button variant="primary" href={`/job/${job._id}`}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>No job postings available at the moment.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
