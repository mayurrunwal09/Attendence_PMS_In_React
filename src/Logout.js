// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authThunks';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    // Redirect or perform any action after logout
  };

  return (
    <div>
      <h2>Logout</h2>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
