// frontend/src/CustomerDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4 mx-auto">
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          Customer Portal
        </div>
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          <Link to="/customer-dashboard" className="bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Dashboard</Link>
          <Link to="/menu" className="hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">View Menu</Link>
          {/* Add more customer specific links */}
          {user && (
            <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
              Logout ({user.username})
            </button>
          )}
        </nav>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome, {user?.username}!</h1>
        <p className="text-center text-gray-600 mb-8">
          Explore our delicious menu or check your order history.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/menu" className="block p-6 bg-teal-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
            <h2 className="text-xl font-semibold text-teal-700 mb-2">View Full Menu</h2>
            <p className="text-gray-600">Browse all the mouth-watering options we offer.</p>
          </Link>
          {/* Example:
          <Link to="/customer-orders" className="block p-6 bg-orange-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
            <h2 className="text-xl font-semibold text-orange-700 mb-2">My Orders</h2>
            <p className="text-gray-600">Track your past and current orders.</p>
          </Link>
          */}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;