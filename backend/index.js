const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const menuRoutes = require('./routes/menuItems');
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config();

const app = express();
app.use(cors()); // Consider specifying origins for production: app.use(cors({ origin: 'https://yourfrontend.com' }));
app.use(express.json()); // Body parser middleware for JSON

// API Routes
app.use('/api/menu-items', menuRoutes);
app.use('/api/users', userRoutes); // Use user routes

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI; // Corrected variable name

mongoose.connect(MONGO_URI) // Mongoose 6+ doesn't need useNewUrlParser/useUnifiedTopology
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));