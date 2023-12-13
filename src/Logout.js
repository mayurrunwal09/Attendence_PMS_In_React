// // Import necessary components and styles
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from './slices/authSlice';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// function Logout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <Box textAlign="center" mt={4} mr={2}>
//       <Typography variant="contained" gutterBottom>
       
//       </Typography>
//       <Button variant="contained" color="primary" onClick={handleLogout}>
//         Logout
//       </Button>
//     </Box>
//   );
// }

// export default Logout;


// Import necessary components and styles
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './slices/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout());
      navigate('/login');
    };

    // Immediately invoke the logout function on component mount
    handleLogout();
  }, [dispatch, navigate]);

  // You can optionally render some loading or redirect message here

  return null; // or <div> or any other placeholder content
}

export default Logout;
