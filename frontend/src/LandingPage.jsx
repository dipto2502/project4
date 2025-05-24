import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-white to-rose-100 min-h-screen flex flex-col items-center">
      {/* Centered Header */}
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4">
        {/* FOODies Title */}
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          FOODies
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          {/* Using Link components for navigation */}
          <Link to="/" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Home</Link>
          {/* <Link to="/hot-item" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Hot Item</Link> */}
          <Link to="/menu" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Menus</Link>
          <Link to="/contact-us" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Contact us</Link>
          <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
            Join
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full flex flex-col lg:flex-row items-center px-10 py-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-snug underline decoration-red-500 underline-offset-8">
            <span className="text-red-600">Welcome</span> to<br />
            The world of <br />
            <span className="text-black">Testy & Fresh Food.</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Keep it easy with these simple but delicious recipes.<br />
            From make-ahead lunches and midweek meals to fuss-free sides.
          </p>
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <input
              type="text"
              placeholder="Search, Burger"
              className="p-3 px-5 border border-gray-300 rounded-full w-64 shadow-sm focus:outline-none"
            />
            <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
          <img
            src="https://logopond.com/logos/0ac4facc18b93551fa2d08ae7b2f8df3.png" // Ensure this image path is correct in your public folder
            alt="Burger"
            className="w-80 md:w-[26rem] drop-shadow-2xl object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
