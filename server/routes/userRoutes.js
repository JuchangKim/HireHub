const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/authenticateToken');

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, phoneNumber, username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Error registering user');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send('User not found');
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send('Invalid password');
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in');
    }
});

// Protected route to get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        console.error('Fetch user error:', error);
        res.status(500).send('Error fetching user');
    }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, resume } = req.body; // Include resume in destructuring
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        // Update the user's fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.resume = resume || user.resume; // Update resume

        await user.save(); // Save the updated user
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).send('Failed to update profile');
    }
});

module.exports = router;
