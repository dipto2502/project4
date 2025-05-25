// E:\Restaurant\res_landing\frontend\src\AdminDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // Get user info and logout function
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) throw new Error("Backend URL not configured.");

      const response = await fetch(`${backendUrl}/api/menu-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Send the JWT token
        },
        body: JSON.stringify({ name, description, price: parseFloat(price), image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item');
      }

      setMessage('Menu item added successfully!');
      // Clear form
      setName('');
      setDescription('');
      setPrice('');
      setImage('');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      {/* Header with Logout for Admin */}
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4 mx-auto">
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          FOODies Admin
        </div>
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          <Link to="/" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Home</Link>
          <Link to="/menu" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">View Menu</Link>
          <button
            onClick={logout}
            className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
        <p className="text-center text-gray-600 mb-8">Welcome, {user?.username} ({user?.role})!</p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">Add New Menu Item</h2>
        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{message}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Item Name:</label>
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
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($):</label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL (Optional):</label>
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

export default AdminDashboard;