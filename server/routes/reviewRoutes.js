const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ timestamp: -1 }); // Sort reviews by timestamp (newest first)
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to add a new review
router.post('/reviews', async (req, res) => {
    const { companyName, reviewerName, rating, reviewText } = req.body;

    try {
        const newReview = new Review({
            companyName,
            reviewerName,
            rating,
            reviewText
        });

        await newReview.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add review' });
    }
});

module.exports = router;
