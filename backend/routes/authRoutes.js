// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const asyncHandler = require('express-async-handler'); // Middleware for handling async errors

// Helper function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, // Payload: user ID and role
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body; // Destructure required fields from request body

  // Validate if all required fields are provided
  if (!username || !email || !password) {
    res.status(400); // Bad request status
    throw new Error('Please enter all required fields: username, email, and password');
  }

  // Check if a user with the given email already exists
  let user = await User.findOne({ email });
  if (user) {
    res.status(400); // Bad request status
    throw new Error('User already exists with this email');
  }

  // Check if a user with the given username already exists
  user = await User.findOne({ username });
  if (user) {
    res.status(400); // Bad request status
    throw new Error('Username already taken');
  }

  // Create a new user instance
  // Note: In a real application, admin registration would be more controlled (e.g., only by existing admins)
  // For this setup, we allow 'role' to be passed, defaulting to 'customer' if not provided.
  const newUser = new User({
    username,
    email,
    password,
    role: role || 'customer' // Set role, default to 'customer'
  });

  // Save the new user to the database
  await newUser.save();

  // Respond with user details and a generated token upon successful registration
  res.status(201).json({ // Created status
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    token: generateToken(newUser._id, newUser.role), // Generate and send JWT
  });
}));

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from request body

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and if the provided password matches the stored hashed password
  if (user && (await user.matchPassword(password))) {
    // Respond with user details and a generated token upon successful login
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // Generate and send JWT
    });
  } else {
    res.status(401); // Unauthorized status
    throw new Error('Invalid email or password'); // Throw error for invalid credentials
  }
}));

module.exports = router; // Export the router
