const express = require('express');
const router = express.Router();
const News = require('../models/News'); // Import the News model

// Function to format date in European style (DD/MM/YYYY HH:MM:SS)
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });
};

// Get all news articles
router.get('/news', async (req, res) => {
    try {
        const newsArticles = await News.find().sort({ datePosted: -1 }).lean(); // Use .lean() to get plain JavaScript objects

        // Format the `datePosted` for each news article
        const formattedArticles = newsArticles.map(article => ({
            ...article,
            datePosted: formatDate(article.datePosted)
        }));

        res.json(formattedArticles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news articles', error: error.message });
    }
});

// Get a specific news article by ID
router.get('/news/:id', async (req, res) => {
    try {
        const article = await News.findOne({ id: parseInt(req.params.id, 10) }).lean();
        if (article) {
            // Format the `datePosted` for the news article
            article.datePosted = formatDate(article.datePosted);

            // Sort comments by time in descending order (most recent first)
            article.comments = article.comments
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map(comment => ({
                    ...comment,
                    time: formatDate(comment.time)
                }));

            res.json(article);
        } else {
            res.status(404).json({ message: 'News article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news article' });
    }
});

// Post a comment to a specific news article
router.post('/news/:id/comments', async (req, res) => {
    try {
        const article = await News.findOne({ id: parseInt(req.params.id, 10) });
        if (article) {
            const { user, text } = req.body;
            if (user && text) {
                const newComment = {
                    user,
                    text,
                    time: new Date()  // Capture current time
                };

                // Add the new comment to the article's comments
                article.comments.push(newComment);
                await article.save();

                // Respond with the updated comments list
                res.status(201).json({ message: 'Comment added successfully', comments: article.comments });
            } else {
                res.status(400).json({ message: 'Invalid comment data' });
            }
        } else {
            res.status(404).json({ message: 'News article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error posting comment' });
    }
});

module.exports = router;
