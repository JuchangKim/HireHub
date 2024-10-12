const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/authenticateToken');

// Register route
// JC - the when user information pass through backend, jobPreferences data are included. Also, jobPreferences data are also register together.
router.post('/register', async (req, res) => {
    console.log(req.body);  
    // JC - the user has job Preferences data.
    const { firstName, lastName, email, phoneNumber, username, password, jobPreferences} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username is already existed');
        }
        // JC - new user has jobPreference data optionally.
        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            username,
            password: hashedPassword,
            // JC - jobPreferences data for user 
            jobPreferences: {
                jobTitle: jobPreferences?.jobTitle || "",
                location: jobPreferences?.location || "",
                industry: jobPreferences?.industry || "",
                salary: jobPreferences?.salary || "",
            }
        });

        await newUser.save();
        res.status(201).send('User registered');
        // Debug to check registering in backend
        console.log("Successful to register");
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
// JC - user's jobPreferences data are included when user update.
router.put('/profile', authenticateToken, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, resume, jobPreferences } = req.body; // Include resume in destructuring
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        // Update the user's fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.resume = resume || user.resume; // Update resume
         // JC - Update job preferences
         user.jobPreferences = {
            jobTitle: jobPreferences?.jobTitle !== undefined ? jobPreferences.jobTitle : user.jobPreferences.jobTitle,
            location: jobPreferences?.location !== undefined ? jobPreferences.location : user.jobPreferences.location,
            salary: jobPreferences?.salary !== undefined ? jobPreferences.salary : user.jobPreferences.salary,
            industry: jobPreferences?.industry !== undefined ? jobPreferences.industry : user.jobPreferences.industry,
        };
        await user.save(); // Save the updated user
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).send('Failed to update profile');
    }
});

module.exports = router;
