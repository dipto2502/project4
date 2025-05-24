import React from 'react';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  return (
    <div className="bg-gradient-to-br from-white to-rose-100 min-h-screen flex flex-col items-center py-12">
      {/* Centered Header - Re-using the header from LandingPage for consistency */}
      <header className="w-full max-w-7xl flex flex-col items-center py-10 space-y-4">
        {/* FOODies Title */}
        <div className="text-red-600 font-extrabold text-5xl md:text-6xl text-center">
          FOODies
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-gray-700 text-lg font-medium">
          <Link to="/" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Home</Link>
          <Link to="/hot-item" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Hot Item</Link>
          <Link to="/menu" className="focus:outline-none hover:bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Menus</Link>
          <Link to="/contact-us" className="focus:outline-none bg-red-100 rounded-md px-2 py-1 transition-colors duration-200">Contact us</Link> {/* Highlight current page */}
          <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition">
            Join
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center border-b-4 border-red-500 pb-4 inline-block mx-auto block">
          Get in Touch with FOODies
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-prose mx-auto text-lg leading-relaxed">
          We're always eager to hear from you! Whether you have a question about our menu, want to provide feedback, or just want to say hello, feel free to reach out. Our team is here to help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="bg-rose-50 p-8 rounded-2xl shadow-inner flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Details</h2>
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-red-500 text-4xl">📍</span> {/* Location icon */}
                <div>
                  <p className="font-semibold text-gray-800 text-lg">Visit Us</p>
                  <p className="text-gray-600 text-base">123 Food Street, Flavor Town, FL 98765</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-red-500 text-4xl">📞</span> {/* Phone icon */}
                <div>
                  <p className="font-semibold text-gray-800 text-lg">Call Us</p>
                  <a href="tel:+1234567890" className="text-red-600 hover:underline text-base">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-red-500 text-4xl">📧</span> {/* Email icon */}
                <div>
                  <p className="font-semibold text-gray-800 text-lg">Email Us</p>
                  <a href="mailto:info@foodies.com" className="text-red-600 hover:underline text-base">info@foodies.com</a>
                </div>
              </div>
            </div>

            {/* Optional: Embed a Google Map */}
            <div className="mt-10 w-full">
              <h3 className="font-semibold text-gray-800 text-xl mb-3 text-center lg:text-left">Find Us on the Map</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15222.096350793661!2d-118.29342735!3d34.0522342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c62c9c7b9c6f%3A0xfc6a4d7d4c2d4c2!2sStaples%20Center!5e0!3m2!1sen!2sus!4v1678234567890!5m2!1sen!2sus" // Replace with your actual Google Maps embed src
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map of our location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 text-lg font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-200"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-y transition duration-200"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white text-xl font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;