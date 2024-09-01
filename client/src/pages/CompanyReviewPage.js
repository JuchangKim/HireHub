import React, { useState } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';

const CompanyReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            companyName,
            reviewerName,
            rating,
            reviewText,
        };
        setReviews([...reviews, newReview]);
        setCompanyName('');
        setReviewerName('');
        setRating('');
        setReviewText('');
    };

    return (
        <Container className="mt-5">
            <h1>Company Reviews</h1>
            <Card className="mb-5">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="reviewerName" className="mt-3">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={reviewerName}
                                onChange={(e) => setReviewerName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="rating" className="mt-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Good</option>
                                <option value="3">3 - Average</option>
                                <option value="2">2 - Poor</option>
                                <option value="1">1 - Terrible</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="reviewText" className="mt-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Submit Review
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <h2>Latest Reviews</h2>
            <ListGroup>
                {reviews.map((review, index) => (
                    <ListGroup.Item key={index}>
                        <h4>{review.companyName}</h4>
                        <h5>Reviewed by: {review.reviewerName}</h5>
                        <p>Rating: {review.rating}</p>
                        <p>{review.reviewText}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CompanyReviewPage;
