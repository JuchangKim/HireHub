import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

function HomePage() {
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
        </Container>
    );
}

export default HomePage;
