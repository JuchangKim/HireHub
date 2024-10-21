
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  background: { type: String, required: true },
  mission: { type: String, required: true },
  benefits: { type: String, required: true },
  culture: { type: String, required: true },
  testimonials: [{ type: String }],
  image: { type: String },
  video: { type: String },
});

module.exports = mongoose.model('Company', CompanySchema);
