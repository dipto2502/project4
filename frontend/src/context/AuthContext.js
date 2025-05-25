// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }) => {
  // State to hold user information and authentication token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage on initial load
  const [loading, setLoading] = useState(true); // To indicate if auth state is being loaded

  // Get the backend URL from environment variables
  // Ensure your .env file has REACT_APP_BACKEND_URL=http://localhost:5000
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Effect to load user data if a token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // In a real app, you'd verify the token with your backend
          // and fetch user details. For now, we'll decode it or assume
          // a valid user based on token presence.
          // For a more robust solution, you'd have a /api/auth/me endpoint
          // that returns user data based on the token.
          // For simplicity, let's assume if a token exists, the user is logged in.
          // You might want to add a call to your backend to validate the token
          // and get user roles here.
          // Example:
          // const response = await fetch(`${backendUrl}/api/auth/me`, {
          //   headers: { 'x-auth-token': token }
          // });
          // const data = await response.json();
          // if (response.ok) {
          //   setUser(data);
          // } else {
          //   console.error('Token validation failed:', data.msg);
          //   localStorage.removeItem('token');
          //   setToken(null);
          //   setUser(null);
          // }
          // For now, we'll just set a placeholder user if token exists.
          setUser({ username: 'Authenticated User', role: 'customer' }); // Placeholder
        } catch (error) {
          console.error('Error loading user from token:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false); // Auth state loaded
    };

    loadUser();
  }, [token, backendUrl]); // Re-run if token or backendUrl changes

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user); // Assuming your backend returns user data on login
        return { success: true, user: data.user };
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        return { success: false, message: data.msg || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error or server unavailable' };
    }
  };

  // Register function
  const register = async (username, password, role) => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // After successful registration, you might automatically log them in
        // or redirect to login page. For now, let's just indicate success.
        return { success: true, message: data.msg || 'Registration successful!' };
      } else {
        return { success: false, message: data.msg || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error or server unavailable' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Value provided by the context
  const authContextValue = {
    user,
    token,
    loading,
    login,
    register, // Expose register function
    logout,
  };

  // Render children only after authentication state has been loaded
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
        Loading authentication...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
