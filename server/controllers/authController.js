const bcrypt = require('bcrypt');
const users = [];  // In-memory storage for users

// Register
const register = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists based on email
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });  // If the email exists, send 400 status
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

    // Log the hashed password to the console
    console.log('Hashed password:', hashedPassword);

    // If no duplicate found, add new user with hashed password
    users.push({ email, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login function remains the same
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  console.log('Input password:', password);  // Logging the input password
  console.log('Stored hashed password:', user.password);  // Logging the stored hashed password

  try {
    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Simple token simulation
      const token = Buffer.from(email).toString('base64');
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error during login' });
  }
};

module.exports = { register, login };