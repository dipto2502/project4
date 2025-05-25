// frontend/src/MenuPage.js (and similar changes for LandingPage.js, ContactUsPage.js)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import useAuth

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, isAdmin, logout } = useAuth(); // Destructure from useAuth

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("REACT_APP_BACKEND_URL environment variable is not set.");
        }
        const response = await fetch(`${backendUrl}/api/menu-items`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl font-semibold text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4 mx-auto">
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          FOODies
        </div>
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          <Link to="/" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Home</Link>
          <Link to="/hot-item" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Hot Item</Link>
          <Link to="/menu" className="focus:outline-none bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Menus</Link>
          <Link to="/contact-us" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Contact us</Link>

          {/* Conditional rendering for Login/Logout/Dashboard */}
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link to="/admin" className="hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Admin Dashboard</Link>
              ) : (
                <Link to="/customer-dashboard" className="hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Customer Dashboard</Link>
              )}
              <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
                Logout ({user.username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
                Login
              </Link>
              <Link to="/register" className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-100 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Delicious Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item._id} className="rounded-lg overflow-hidden shadow-sm border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-red-500 font-bold text-lg">${item.price.toFixed(2)}</span>
                    {/* Add to Cart button (can be shown to all or only logged-in customers) */}
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500 text-lg">No menu items found. Please add some!</p>
          )}
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>Craving something else? <Link to="#" className="text-red-500 hover:underline">See our full menu</Link></p>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;