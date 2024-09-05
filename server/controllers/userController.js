const User = require("../models/User");

// Fetch user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Validate input
  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!phoneNumber) errors.phoneNumber = "Phone number is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phoneNumber },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
