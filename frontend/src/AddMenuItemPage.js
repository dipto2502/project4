// frontend/src/AddMenuItemPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // To get the token

const AddMenuItemPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(''); // For image URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth(); // Get user (to access token)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Basic validation
    if (!name || !description || !price) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = user?.token; // Get token from logged-in user

    if (!token) {
      setError('You are not authenticated. Please log in as an admin.');
      setLoading(false);
      navigate('/login'); // Redirect to login
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/menu-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token
        },
        body: JSON.stringify({ name, description, price: parseFloat(price), category, image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add menu item');
      }

      const newItem = await response.json();
      setMessage(`Menu item "${newItem.name}" added successfully!`);
      // Clear form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
      setTimeout(() => navigate('/admin'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      console.error("Error adding menu item:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4 mx-auto">
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          Add New Menu Item
        </div>
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          <Link to="/admin" className="hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Admin Dashboard</Link>
          <Link to="/admin/add-menu-item" className="bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Add Menu Item</Link>
        </nav>
      </header>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Dish/Drink</h1>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price ($):
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category (Optional):
            </label>
            <input
              type="text"
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image URL (Optional):
            </label>
            <input
              type="text"
              id="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItemPage;