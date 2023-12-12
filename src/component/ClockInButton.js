import React, { useState } from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import { Alarm, AlarmOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

const ClockInOutButtons = () => {
  const [isClockInClicked, setClockInClicked] = useState(false);
  const [isClockInLoading, setClockInLoading] = useState(false);

  const handleClockButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userIdFromToken = jwtDecode(token).UserId;

      if (!userIdFromToken) {
        console.error('Invalid user id from token');
        return;
      }

      setClockInLoading(true);

      const endpoint = isClockInClicked
        ? 'https://localhost:44369/api/ClockOut/InserClockOut'
        : 'https://localhost:44369/api/Attendence/ClockIn';

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
        console.log(isClockInClicked ? 'Clock Out successful' : 'Clock In successful');
        setClockInClicked(!isClockInClicked);
      } else {
        console.error(isClockInClicked ? 'Clock Out failed' : 'Clock In failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    } finally {
      setClockInLoading(false);
    }
  };
  const clockButtonStyle = {
    backgroundColor: '#1976D2', // Adjust this color to match your app's color scheme
    color: '#FFFFFF', // Text color, adjust as needed
    marginRight: '10px', // Adjust the spacing from the Logout button
  };
  return (
    <div>
      <IconButton
       // color="success"
        onClick={handleClockButtonClick}
        disabled={isClockInLoading}
        style={clockButtonStyle}
      >
        {isClockInLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : isClockInClicked ? (
          <AlarmOff />
        ) : (
          <Alarm />
        )}
      </IconButton>
    </div>
  );
};

export default ClockInOutButtons;






