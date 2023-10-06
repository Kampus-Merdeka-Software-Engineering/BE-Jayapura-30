const { User } = require('../model/user'); 

// Register function
async function register(req, res) {
  try {
    const { nama, email, password } = req.body;

    // Check if all required fields are provided
    if (!nama || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // Create a new user 
    const newUser = await User.create({ nama, email, password });

    res.json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Login function
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Authentication successful
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { register, login };