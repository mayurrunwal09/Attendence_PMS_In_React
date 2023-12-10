import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const ClockInOutButtons = () => {
  const [isClockInClicked, setClockInClicked] = useState(false);
  const [isClockInLoading, setClockInLoading] = useState(false);

  const handleClockIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const userIdFromToken = jwtDecode(token).UserId;

      if (!userIdFromToken) {
        console.error('Invalid user id from token');
        return;
      }

      setClockInLoading(true);

      const response = await fetch('https://localhost:44369/api/Attendence/ClockIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdFromToken,
          checkInTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Clock In successful');
        setClockInClicked(true);
      } else {
        console.error('Clock In failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    } finally {
      setClockInLoading(false);
    }
  };

  const handleClockOut = async () => {
    // Similar logic as Clock In, adjust the API endpoint as needed
    try {
      const token = localStorage.getItem('token');
      const userIdFromToken = jwtDecode(token).UserId;

      if (!userIdFromToken) {
        console.error('Invalid user id from token');
        return;
      }

      const response = await fetch('https://localhost:44369/api/ClockOut/InserClockOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userIdFromToken,
          checkInTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Clock Out successful');
        // Additional actions upon successful Clock Out
      } else {
        console.error('Clock Out failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
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

      {isClockInClicked && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClockOut}
          disabled={/* Add your condition for disabling Clock Out button */ false}
        >
          Clock Out
        </Button>
      )}
    </div>
  );
};

export default ClockInOutButtons;
