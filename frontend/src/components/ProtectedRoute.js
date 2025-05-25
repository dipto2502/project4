// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly }) => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    // You might want a loading spinner here
    return <div className="text-center py-20 text-xl font-semibold">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    // Not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Authenticated but not an admin, redirect to a non-admin dashboard or home
    // You might want a more specific "Access Denied" page here
    return <Navigate to="/customer-dashboard" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;