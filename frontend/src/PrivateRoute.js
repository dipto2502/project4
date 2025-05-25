// E:\Restaurant\res_landing\frontend\src\PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming this path is correct

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to home or unauthorized page if role doesn't match
    // You might want a specific "Access Denied" page here
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;