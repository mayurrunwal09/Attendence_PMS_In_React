// ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './component/Home';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Home />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;




