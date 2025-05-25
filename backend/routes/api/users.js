// E:\Restaurant\res_landing\backend\routes\api\users.js (renamed to authRoutes.js for clarity)
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Adjust path to User model
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // For simplified error handling

// Helper function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation for required fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please enter all required fields: username, email, and password');
  }

  // Check if a user with the given email already exists
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Check if a user with the given username already exists
  user = await User.findOne({ username });
  if (user) {
    res.status(400);
    throw new Error('Username already taken');
  }

  // Create a new user instance
  // The 'role' can be passed, but in a real application, admin registration
  // should be more controlled (e.g., only by an existing admin).
  // Here, it defaults to 'customer' if not provided.
  const newUser = new User({
    username,
    email,
    password, // Password will be hashed by the pre-save hook in the User model
    role: role || 'customer'
  });

  // Save the new user to the database
  await newUser.save();

  // Respond with user details and a generated token
  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    token: generateToken(newUser._id, newUser.role), // Generate token for the new user
  });
}));

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and if the provided password matches the stored hashed password
  if (user && (await user.matchPassword(password))) {
    // If authentication is successful, respond with user details and a token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // Generate token for the logged-in user
    });
  } else {
    // If authentication fails, send an unauthorized status
    res.status(401);
    throw new Error('Invalid email or password');
  }
}));

module.exports = router;
