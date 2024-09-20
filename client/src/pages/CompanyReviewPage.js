import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';

const CompanyReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');

    // Caculating average rating score in company
    const calculateAverageRating = (companyName) => {
        
        const companyReviews = reviews.filter((review) => review.companyName === companyName);
        
        if (companyReviews.length === 0) return 0;
        
        const totalRating = companyReviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
        return (totalRating / companyReviews.length).toFixed(1); // Round to 1 decimal place
    };

    // It fetch the company.js in server file which is stored the company reviews.
    // Then the company reviews presents in the company review page.
    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


    // Handling summit function when the summit review button clicked.
    // It make store the review in Compnay.js in server.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            companyName,
            reviewerName,
            rating,
            reviewText,
        };
    
        try {
            // Send the review data to the backend
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure proper content-type is set
                },
                body: JSON.stringify(newReview),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add review');
            }
    
            const result = await response.json();
            console.log(result.message); // Output success message
            
            // Update the state with the new review and sort by timestamp
            setReviews((prevReviews) => [newReview, ...prevReviews]);
            setCompanyName('');
            setReviewerName('');
            setRating('');
            setReviewText('');
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    
        
    useEffect(() => {
        fetchReviews();
    }, []);
    
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
        {reviews.map((review, index) => {
        const averageRating = calculateAverageRating(review.companyName);
        const reviewDate = new Date(review.timestamp).toLocaleString();

        return (
            <ListGroup.Item key={index} className="mb-3">
                <Card className="p-3">
                    <Card.Body>
                        {/* Create a row to divide the card into two columns */}
                        <div className="row">
                            {/* Left side with company name and average rating */}
                            <div className="col-md-4 border-end">
                                <h4 className="mb-2">{review.companyName}</h4>
                                <div className="d-flex align-items-center">
                                    <span className="me-2"><h5>Average Rating: {averageRating}</h5></span>
                                </div>
                            </div>

                            {/* Right side with reviewer information and review text */}
                            <div className="col-md-8">
                                <div className="d-flex justify-content-between mb-2">
                                    <h5>Name : {review.reviewerName}</h5>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <h5>Rate : {review.rating}</h5>
                                </div>
                                <Card.Text>
                                    <h5>Review</h5><p>{review.reviewText}</p>
                                </Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        );
    })}
</ListGroup>
        </Container>
    );
};

export default CompanyReviewPage;
