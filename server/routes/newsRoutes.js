// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const seedNews = require('../scripts/seedNews');

// Get all news articles
router.get('/news', (req, res) => {
    res.json(seedNews);
});

// Get a specific news article by ID
router.get('/news/:id', (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = seedNews.find(news => news.id === articleId);

    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'News article not found' });
    }
});

// Post a comment to a specific news article
router.post('/news/:id/comments', (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = seedNews.find(news => news.id === articleId);

    if (article) {
        const { user, text } = req.body;
        if (user && text) {
            article.comments.push({ user, text });
            res.status(201).json({ message: 'Comment added successfully', comments: article.comments });
        } else {
            res.status(400).json({ message: 'Invalid comment data' });
        }
    } else {
        res.status(404).json({ message: 'News article not found' });
    }
});

module.exports = router;
