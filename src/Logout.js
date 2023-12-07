// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './slices/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h2></h2>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
