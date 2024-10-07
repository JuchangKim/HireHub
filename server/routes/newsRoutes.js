// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const seedNews = require('../scripts/seedNews');

const seedNewsFilePath = path.resolve(__dirname, '../scripts/seedNews.json');

// Function to save seedNews back to the file
const saveSeedNewsToFile = (newsData) => {
    fs.writeFile(seedNewsFilePath, JSON.stringify(newsData, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Failed to save comments to seedNews.json:', err);
        } else {
            console.log('Successfully saved comments to seedNews.json');
        }
    });
};

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
            const newComment = { user, text, time: new Date().toLocaleString() };
            article.comments.push(newComment);
            saveSeedNewsToFile(seedNews); // Save updated data to the file
            res.status(201).json({ message: 'Comment added successfully', comments: article.comments });
        } else {
            res.status(400).json({ message: 'Invalid comment data' });
        }
    } else {
        res.status(404).json({ message: 'News article not found' });
    }
});

module.exports = router;