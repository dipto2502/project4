// E:\Restaurant\res_landing\backend\models\MenuItem.js
const mongoose = require('mongoose');

// Define the MenuItem schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // Ensure menu item names are unique
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be negative
  },
  category: {
    type: String,
    trim: true,
    default: 'Main Course' // Default category if not provided
  },
  image: {
    type: String, // Store URL to the image
    default: '[https://placehold.co/400x300/E0E0E0/333333?text=No+Image](https://placehold.co/400x300/E0E0E0/333333?text=No+Image)' // Placeholder image
  }
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields
});

// Export the MenuItem model
module.exports = mongoose.model('MenuItem', menuItemSchema);
