// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Corrected import path

const RegisterPage = () => {
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState('');     // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { register, user } = useAuth(); // Get register function and current user from AuthContext
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Redirect if user is already logged in
  if (user) {
    if (user.role === 'admin') {
      navigate('/admin'); // Redirect admin to admin dashboard
    } else {
      navigate('/customer-dashboard'); // Redirect customer to customer dashboard
    }
    return null; // Don't render registration form if redirected
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous errors
    setLoading(true); // Set loading to true

    // Basic client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please enter all required fields: username, email, and password.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Call the register function from AuthContext
      // By default, new users register as 'customer'.
      // If you need to register an admin, you would typically have a separate,
      // more controlled process for that, or temporarily modify this for testing.
      const result = await register(username, email, password, 'customer');

      if (result.success) {
        // Registration successful, AuthContext will handle navigation based on role
        // The check at the start of this component will trigger the redirect
      } else {
        setError(result.message); // Display error message from the registration attempt
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.'); // Catch and display any unexpected errors
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register for FOODies</h2>
        {/* Display error message if present */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Registering...' : 'Register'} {/* Change button text based on loading state */}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-700 font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
