const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Import middleware

// GET all menu items
// Accessible by anyone (public view)
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new menu item
// Only accessible by users with 'admin' role
router.post('/', protect, authorizeRoles('admin'), async (req, res) => {
  const { name, description, price, image } = req.body;
  const newItem = new MenuItem({ name, description, price, image });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// You might also want to add PUT and DELETE routes for admin:
// PUT update menu item
router.put('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE menu item
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;