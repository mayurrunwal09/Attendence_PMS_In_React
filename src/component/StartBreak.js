






import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { PlayArrow, Stop } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

const BreakManagement = () => {
  const [isBreakStarted, setBreakStarted] = useState(false);
  const [isBreakLoading, setBreakLoading] = useState(false);

  const handleBreakButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userIdFromToken = jwtDecode(token).UserId;

      if (!userIdFromToken) {
        console.error('Invalid user id from token');
        return;
      }

      setBreakLoading(true);

      const endpoint = isBreakStarted
        ? 'https://localhost:44369/api/FinishBreak/InsertFinishBreak'
        : 'https://localhost:44369/api/Break/InsertBreak';

      const response = await fetch(endpoint, {
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
        console.log(isBreakStarted ? 'Break Finish successful' : 'Break Start successful');
        setBreakStarted(!isBreakStarted);
      } else {
        console.error(isBreakStarted ? 'Break Finish failed' : 'Break Start failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    } finally {
      setBreakLoading(false);
    }
  };
  const darkSkyColor = {
    backgroundColor: '#1976D2', // Adjust this color to match your app's color scheme
    color: '#FFFFFF', // Text color, adjust as needed
    marginRight: '10px', // Adjust the spacing from the Logout button
  };
  return (
    <div>
      <Button
        variant="contained"
        //color="success"
        onClick={handleBreakButtonClick}
        disabled={isBreakLoading}
        startIcon={isBreakStarted ? <Stop /> : <PlayArrow />}
        style={darkSkyColor}
      >
        {isBreakLoading ? <CircularProgress size={24} color="inherit" /> : isBreakStarted ? 'Finish Break' : 'Start Break'}
      </Button>
    </div>
  );
};

export default BreakManagement;

