// frontend/src/AddMenuItem.js
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Assuming AuthContext is in src/context
import { useNavigate } from 'react-router-dom';

const AddMenuItem = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Optional: for image URL
  const [message, setMessage] = useState(''); // For success/error messages
  const [error, setError] = useState(''); // For specific error messages

  // Get the backend URL from environment variables
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');   // Clear previous errors

    // Basic validation
    if (!name || !description || !price || !category) {
      setError('Please fill in all required fields.');
      return;
    }

    // Ensure price is a valid number
    if (isNaN(parseFloat(price))) {
      setError('Price must be a valid number.');
      return;
    }

    if (!token) {
      setError('You are not authorized to add menu items. Please log in as an admin.');
      navigate('/login'); // Redirect to login if no token
      return;
    }

    if (user?.role !== 'admin') {
      setError('Access Denied: Only administrators can add menu items.');
      navigate('/access-denied'); // Redirect if not admin
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/menu`, { // Assuming your backend has /api/menu for adding items
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Send the token for authentication
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price), // Convert price to number
          category,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Menu item added successfully!');
        // Clear the form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImageUrl('');
      } else {
        setError(data.msg || 'Failed to add menu item.');
      }
    } catch (err) {
      console.error('Error adding menu item:', err);
      setError('Network error or server unavailable.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-rose-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">
          Add New <span className="text-red-600">Menu Item</span>
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
          Use this form to add new delicious items to your restaurant's menu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Classic Burger"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="A juicy beef patty with fresh lettuce, tomato, and special sauce."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-y"
              required
            ></textarea>
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="price" className="block text-gray-700 text-lg font-medium mb-2">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 12.99"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-gray-700 text-lg font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Burgers, Appetizers, Drinks"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Image URL Input (Optional) */}
          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 text-lg font-medium mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="e.g., https://example.com/burger.jpg"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
            />
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Add Item
          </button>

          {/* Messages */}
          {message && (
            <p className="text-center text-lg text-green-600 mt-4">{message}</p>
          )}
          {error && (
            <p className="text-center text-lg text-red-600 mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;
