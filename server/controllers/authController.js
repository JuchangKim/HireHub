
const users = [];

// Register
const register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered' });
};

// Login
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // Simple token simulation
    const token = Buffer.from(username).toString('base64');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { register, login };
