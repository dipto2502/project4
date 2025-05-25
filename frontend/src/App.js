// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth

// Import your components
import LandingPage from './LandingPage';
import ContactUsPage from './ContactUsPage';
import MenuPage from './MenuPage'; // Assuming you have a MenuPage
import RegisterPage from './RegisterPage'; // Assuming you have a RegisterPage
import LoginPage from './LoginPage'; // Assuming you have a LoginPage
import CustomerDashboard from './CustomerDashboard'; // Assuming you have this
import AdminDashboard from './AdminDashboard'; // Assuming you have this
import AddMenuItem from './AddMenuItem'; // Assuming you have this

// PrivateRoute component for protected routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
        Loading...
      </div>
    );
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but unauthorized role, redirect to a suitable page or show access denied
    return <Navigate to="/access-denied" replace />; // You might create an AccessDeniedPage
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Wrap your entire application with AuthProvider */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Customer Dashboard */}
          <Route
            path="/customer-dashboard"
            element={
              <PrivateRoute allowedRoles={['customer', 'admin']}>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-menu-item"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddMenuItem />
              </PrivateRoute>
            }
          />

          {/* Fallback for access denied or unknown routes */}
          <Route path="/access-denied" element={
            <div className="flex justify-center items-center min-h-screen text-xl text-red-600">
              Access Denied. You do not have permission to view this page.
            </div>
          } />
          <Route path="*" element={
            <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
              404 - Page Not Found
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
