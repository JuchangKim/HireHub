const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
