// E:\Restaurant\res_landing\backend\routes\api\menu.js (renamed to menuItemRoutes.js for clarity)
const express = require('express');
const router = express.Router();
const MenuItem = require('../../models/MenuItem'); // Adjust path to MenuItem model
const { protect, authorizeRoles } = require('../../middleware/authMiddleware'); // Import middleware
const asyncHandler = require('express-async-handler'); // For simplified error handling

// @route   GET /api/menu-items
// @desc    Get all menu items
// @access  Public (anyone can view the menu)
router.get('/', asyncHandler(async (req, res) => {
  const items = await MenuItem.find({}); // Find all menu items
  res.json(items); // Respond with the menu items
}));

// @route   POST /api/menu-items
// @desc    Add a new menu item
// @access  Private (Admin only) - protected by 'protect' and 'authorizeRoles' middleware
router.post('/', protect, authorizeRoles('admin'), asyncHandler(async (req, res) => {
  const { name, description, price, category, image } = req.body;

  // Basic validation for required fields
  if (!name || !description || !price) {
    res.status(400);
    throw new Error('Please include all required fields: name, description, and price');
  }

  // Create a new MenuItem instance
  const newItem = new MenuItem({
    name,
    description,
    price,
    category,
    image
  });

  // Save the new item to the database
  const savedItem = await newItem.save();
  res.status(201).json(savedItem); // Respond with the newly created item and 201 status

}));

// @route   PUT /api/menu-items/:id
// @desc    Update an existing menu item
// @access  Private (Admin only)
router.put('/:id', protect, authorizeRoles('admin'), asyncHandler(async (req, res) => {
  const { name, description, price, category, image } = req.body;

  // Find the menu item by ID
  const item = await MenuItem.findById(req.params.id);

  if (item) {
    // Update item fields if provided in the request body
    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.category = category || item.category;
    item.image = image || item.image;

    // Save the updated item
    const updatedItem = await item.save();
    res.json(updatedItem); // Respond with the updated item
  } else {
    res.status(404); // Not Found
    throw new Error('Menu item not found');
  }
}));

// @route   DELETE /api/menu-items/:id
// @desc    Delete a menu item
// @access  Private (Admin only)
router.delete('/:id', protect, authorizeRoles('admin'), asyncHandler(async (req, res) => {
  // Find the menu item by ID
  const item = await MenuItem.findById(req.params.id);

  if (item) {
    await item.deleteOne(); // Delete the item
    res.json({ message: 'Menu item removed successfully' }); // Respond with success message
  } else {
    res.status(404); // Not Found
    throw new Error('Menu item not found');
  }
}));

module.exports = router;
