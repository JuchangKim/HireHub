const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const seedNews = require('../scripts/seedNews');

const seedNewsFilePath = path.resolve(__dirname, '../scripts/seedNews.json');

// Function to save the updated news data back to the file
const saveSeedNewsToFile = (newsData) => {
    fs.writeFileSync(seedNewsFilePath, JSON.stringify(newsData, null, 2), 'utf-8');
};

// Function to format date in European style (DD/MM/YYYY HH:MM:SS)
const formatDateEuropean = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true  // Use 24-hour format
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
        // Format time for each comment in European style before sending the response
        const formattedArticle = {
            ...article,
            comments: article.comments.map(comment => ({
                ...comment,
                time: formatDateEuropean(comment.time)  // Apply European date format to comment times
            }))
        };

        res.json(formattedArticle);
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
            const newComment = {
                user,
                text,
                // Format the current time using 'en-GB' locale for European format
                time: new Date().toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false  // Use 24-hour format
                })  // Capture and format current time
            };

            // Add the new comment to the article's comments
            article.comments.push(newComment);

            // Save updated data to the seedNews file
            saveSeedNewsToFile(seedNews);

            // Respond with the updated comments list
            res.status(201).json({ message: 'Comment added successfully', comments: article.comments });
        } else {
            res.status(400).json({ message: 'Invalid comment data' });
        }
    } else {
        res.status(404).json({ message: 'News article not found' });
    }
});

module.exports = router;
