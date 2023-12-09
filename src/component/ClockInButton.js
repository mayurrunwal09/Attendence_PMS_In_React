import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const ClockInButton = () => {
  const [isClockInClicked, setClockInClicked] = useState(false);
  const [isClockInLoading, setClockInLoading] = useState(false);

  const handleClockIn = async () => {
    try {
      // Extract UserId from JWT token
      const token = localStorage.getItem('token');
      const userIdFromToken = jwtDecode(token).UserId;

      // Check if userIdFromToken is a valid user in your system
      if (!userIdFromToken) {
        console.error('Invalid user id from token');
        return;
      }

      setClockInLoading(true); // Set loading state

      // Perform the ClockIn API call
      const response = await fetch('https://localhost:44369/api/Attendence/ClockIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify({
          userId: userIdFromToken,
          checkInTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Clock In successful');
        setClockInClicked(true); // Set state to true after successful clock in
        // You can perform any additional actions upon successful clock in
      } else {
        console.error('Clock In failed');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    } finally {
      setClockInLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClockIn}
        disabled={isClockInClicked || isClockInLoading}
      >
        {isClockInLoading ? <CircularProgress size={24} color="inherit" /> : 'Clock In'}
      </Button>
    </div>
  );
};

export default ClockInButton;

