import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, companyOnly = false, ...rest }) => {
  const { isAuthenticated, userType } = useAuth();

  // Check if the route is restricted to companies
  if (companyOnly && userType !== 'company') {
    return <Navigate to="/" replace />;
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
