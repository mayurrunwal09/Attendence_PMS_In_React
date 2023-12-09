
// import React, { useState } from 'react';
// import { Button } from '@mui/material';
// import { jwtDecode } from 'jwt-decode';

// const StartBreak = () => {
//   const [isClockInClicked, setClockInClicked] = useState(false);

//   const handleClockIn = async () => {
//     try {
//       // Extract UserId from JWT token
//       const token = localStorage.getItem('token');
//       const userIdFromToken = jwtDecode(token).UserId;

//       // Check if userIdFromToken is a valid user in your system
//       if (!userIdFromToken) {
//         console.error('Invalid user id from token');
//         return;
//       }

//       // Perform the ClockIn API call
//       const response = await fetch('https://localhost:44369/api/Break/InsertBreak', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any other headers if needed
//         },
//         body: JSON.stringify({
//           userId: userIdFromToken,
//           checkInTime: new Date().toISOString(),
//         }),
//       });

//       if (response.ok) {
//         console.log('Break Start successful');
//         setClockInClicked(true); // Set state to true after successful clock in
//         // You can perform any additional actions upon successful clock in
//       } else {
//         console.error('Clock In failed');
//         // Handle error scenarios
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClockIn} disabled={isClockInClicked}>
//         Start Break
//       </Button>
//     </div>
//   );
// };

// export default StartBreak;



















import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const BreakManagement = () => {
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

      const response = await fetch('https://localhost:44369/api/Break/InsertBreak', {
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
        console.log('Break start successful');
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

      const response = await fetch('https://localhost:44369/api/FinishBreak/InsertFinishBreak', {
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
        console.log('Break Finish successful');
        // Additional actions upon successful Clock Out
      } else {
        console.error('Break Finish failed');
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
        {isClockInLoading ? <CircularProgress size={24} color="inherit" /> : 'Start Break'}
      </Button>

      {isClockInClicked && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClockOut}
          disabled={/* Add your condition for disabling Clock Out button */ false}
        >
          Finish Break
        </Button>
      )}
    </div>
  );
};

export default BreakManagement;
