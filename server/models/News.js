const mongoose = require('mongoose');

// Define the schema for news articles
const newsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, required: true },
  imageUrl: { type: String },
  industry: { type: [String], required: true },
  companies: [{
    name: { type: String, required: true },
    url: { type: String, required: true }
  }],
  comments: [{
    user: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: Date, required: true }
  }]
});

// Create and export the news model
const News = mongoose.model('news', newsSchema);

module.exports = News;