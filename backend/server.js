    // E:\Restaurant\res_landing\backend\server.js (or index.js)
    require('dotenv').config(); // Load environment variables from .env file
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors'); // Import cors for handling cross-origin requests
    const path = require('path'); // For serving static files in production

    // Import routes
    const menuItemRoutes = require('./routes/api/menu'); // Corrected path and name
    const authRoutes = require('./routes/api/users'); // Corrected path and name (was users.js)

    const app = express();
    const PORT = process.env.PORT || 5000;
    const MONGO_URI = process.env.MONGO_URI;
    const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in .env

    // Connect to MongoDB
    mongoose.connect(MONGO_URI)
      .then(() => console.log('MongoDB connected...'))
      .catch(err => console.error('MongoDB connection error:', err));

    // Middleware
    app.use(cors()); // Enable CORS for all origins (for development)
    app.use(express.json()); // Body parser middleware for JSON data

    // API Routes
    // Use the imported routes with appropriate base paths
    app.use('/api/menu-items', menuItemRoutes);
    app.use('/api/auth', authRoutes); // Use auth routes for /api/auth

    // Error handling middleware (optional but good practice for express-async-handler)
    // This catches errors thrown by asyncHandler and sends a structured response
    app.use((err, req, res, next) => {
      console.error(err.stack); // Log the full error stack for debugging
      // Determine the status code: if it's 200 (OK), it means an error occurred
      // but the status wasn't explicitly set, so default to 500 (Internal Server Error)
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode).json({
        message: err.message, // Send the error message
        // Include stack trace only in development environment for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    });

    // Serve frontend in production (if you're deploying backend and frontend from same server)
    // This block is for scenarios where your React app is built into the backend's 'build' folder
    if (process.env.NODE_ENV === 'production') {
      // Serve static files from the 'build' directory of the frontend
      app.use(express.static(path.join(__dirname, '../frontend/build')));

      // For any other GET request, serve the frontend's index.html
      app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
      );
    } else {
      // In development, just send a simple message for the root path
      app.get('/', (req, res) => {
        res.send('API is running...');
      });
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    