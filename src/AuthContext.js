
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, logout } from './slices/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      validateToken();
    }
  }, [isAuthenticated]);

  const validateToken = async () => {
    try {
      // Replace with actual token validation logic on the server
      const isValidToken = true;

      if (!isValidToken) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      handleLogout();
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    console.log('Stored Token:', token);
    setIsAuthenticated(true);
    dispatch(loginSuccess({ token }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};








