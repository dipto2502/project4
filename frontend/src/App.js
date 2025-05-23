import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage'; // Adjust path if needed
import MenuPage from './MenuPage';   // Adjust path if needed

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-white shadow py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-red-600 font-extrabold text-2xl">FOODies</Link>
                <div className="ml-8 space-x-4">
                  <Link to="/" className="text-gray-700 hover:text-red-500 transition">Home</Link>
                  <Link to="/hot-item" className="text-gray-700 hover:text-red-500 transition">Hot Item</Link>
                  <Link to="/menu" className="text-gray-700 hover:text-red-500 transition">Menus</Link>
                  <Link to="/contact-us" className="text-gray-700 hover:text-red-500 transition">Contact us</Link>
                  <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* You can add more routes for other pages here */}
          <Route path="/hot-item" element={<div>Hot Item Page</div>} /> {/* Example */}
          <Route path="/contact-us" element={<div>Contact Us Page</div>} /> {/* Example */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;