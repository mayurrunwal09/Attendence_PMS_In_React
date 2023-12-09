
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const EndBreak = () => {
  const [isClockInClicked, setClockInClicked] = useState(false);

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

      // Perform the ClockIn API call
      const response = await fetch('https://localhost:44369/api/FinishBreak/InsertFinishBreak', {
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
        console.log('Break Finished successful');
        setClockInClicked(true); // Set state to true after successful clock in
        // You can perform any additional actions upon successful clock in
      } else {
        console.error('Clock In failed');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClockIn} disabled={isClockInClicked}>
        Finish Break
      </Button>
    </div>
  );
};

export default EndBreak;
