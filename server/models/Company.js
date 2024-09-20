const express = require('express');
const router = express.Router();

let reviews = []; // Temporary in-memory storage for reviews

// Endpoint to add a new review
router.post('/reviews', (req, res) => {
    const { companyName, reviewerName, rating, reviewText } = req.body;
    const newReview = {
        companyName,
        reviewerName,
        rating,
        reviewText,
        timestamp: new Date() // Add timestamp to sort by submission time
    };
    reviews.push(newReview);
    res.status(201).json({ message: 'Review added successfully', review: newReview });
});

// Endpoint to get all reviews
router.get('/reviews', (req, res) => {
    res.json(reviews);
});

module.exports = router;