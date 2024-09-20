
// client/src/components/JobDetailsPage.js
import React, { useEffect, useState } from 'react';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetailsPage() {
    const { id } = useParams();

    const [jobDetails, setJobDetails] = useState(null);

    const [job, setJob] = useState(null);


    useEffect(() => {
        const fetchJobDetails = async () => {
            try {

                const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setJobDetails(data);

                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(response.data);

            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [id]);


    if (!jobDetails) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            <h1>{jobDetails.title}</h1>
            <h2>{jobDetails.company}</h2>
            <p><strong>Location:</strong> {jobDetails.location}</p>
            <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
            {jobDetails.salary && <p><strong>Salary:</strong> ${jobDetails.salary}</p>}
            <h3>Job Description</h3>
            <p>{jobDetails.description}</p>
            {jobDetails.responsibilities && (
                <>
                    <h3>Responsibilities</h3>
                    <p>{jobDetails.responsibilities}</p>
                </>
            )}
            {jobDetails.requirements && (
                <>
                    <h3>Requirements</h3>
                    <p>{jobDetails.requirements}</p>
                </>
            )}
            {jobDetails.companyWebsite && (
                <p><strong>Company Website:</strong> <a href={jobDetails.companyWebsite} target="_blank" rel="noopener noreferrer">{jobDetails.companyWebsite}</a></p>
            )}
            {jobDetails.deadline && (
                <p><strong>Application Deadline:</strong> {jobDetails.deadline}</p>
            )}
        </div>


    return (
        <Container fluid className="p-4">
            {job ? (
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="job-details-card">
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Location:</strong> {job.location}<br />
                                    <strong>Salary:</strong> {job.salary}<br />
                                    <strong>Sector:</strong> {job.sector}<br />
                                    <strong>Work Type:</strong> {job.workType}<br />
                                    <strong>Description:</strong> {job.description}  {/* Show full description */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <p>Loading job details...</p>
                    </Col>
                </Row>
            )}
        </Container>

    );
}

export default JobDetailsPage;
