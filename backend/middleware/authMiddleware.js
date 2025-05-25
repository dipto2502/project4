// E:\Restaurant\res_landing\backend\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Simplifies error handling for async routes
const User = require('../models/User'); // Import the User model

// Middleware to protect routes: checks for a valid JWT and attaches user info to the request
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the 'Bearer <token>' string
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID extracted from the token payload
      // .select('-password') excludes the password hash from the returned user object
      req.user = await User.findById(decoded.id).select('-password');
      req.userRole = decoded.role; // Attach the user's role from the token payload

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(401); // Set status to Unauthorized
      throw new Error('Not authorized, token failed'); // Throw error to be caught by asyncHandler
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401); // Set status to Unauthorized
    throw new Error('Not authorized, no token'); // Throw error
  }
});

// Middleware to authorize roles: checks if the authenticated user has one of the required roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user role is attached and if it's included in the allowed roles
    if (!req.userRole || !roles.includes(req.userRole)) {
      res.status(403); // Set status to Forbidden
      // Provide a descriptive error message
      throw new Error(`User role ${req.userRole || 'not found'} is not authorized to access this route. Required roles: ${roles.join(', ')}`);
    }
    next(); // Proceed if authorized
  };
};

// Export the middleware functions
module.exports = { protect, authorizeRoles };
