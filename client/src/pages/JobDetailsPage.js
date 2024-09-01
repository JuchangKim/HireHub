import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function JobDetailsPage() {
  const { id } = useParams();

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Job Details for Job ID: {id}</h2>
          {/* Replace with actual job details(place holder) */}
          <p>Description of the job goes here...</p>
          <Button variant="primary">Apply Now</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default JobDetailsPage;
