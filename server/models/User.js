const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // Phone number field
    resume: { type: String, default: '' } // Add resume field
});

const User = mongoose.model('User', userSchema);
module.exports = User;
