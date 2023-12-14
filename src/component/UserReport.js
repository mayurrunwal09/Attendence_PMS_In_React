
// // UserReport.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUserBreakDuration } from '../slices/Report/reposrtSlice';
// import { jwtDecode } from 'jwt-decode';
// import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
// import { format } from 'date-fns';

// const UserReport = () => {
//   const dispatch = useDispatch();
//   const [fetchedData, setFetchedData] = useState(null);
//   const userIdFromToken = jwtDecode(localStorage.getItem('token')).UserId;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const action = await dispatch(fetchUserBreakDuration(userIdFromToken));
//         const data = action.payload;
//         setFetchedData(data);
//       } catch (error) {
//         console.error('Error fetching user break duration data:', error.message);
//       }
//     };

//     fetchData();
//   }, [dispatch, userIdFromToken]);

//   return (
//     <div>
//       {fetchedData && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Day</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Start Break Time</TableCell>
//                 <TableCell>Finish Break Time</TableCell>
//                 <TableCell>Break Duration</TableCell>
//               
//                 {/* <TableCell>Productive Hours</TableCell> */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {fetchedData.map((row) => (
//                 <TableRow key={row.userId}>
//                   <TableCell>{new Date(row.breakStartTime).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
//                   <TableCell>{format(new Date(row.breakStartTime), 'yyyy-MM-dd')}</TableCell>
//                   <TableCell>{new Date(row.breakStartTime).toLocaleTimeString()}</TableCell>
//                   <TableCell>{new Date(row.finishBreakTime).toLocaleTimeString()}</TableCell>
//                   <TableCell>{row.breakDuration}</TableCell>
//                 
//                   {/* <TableCell>{row.productiveHours}</TableCell> */}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default UserReport;










// UserReport.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserBreakDuration } from '../slices/Report/reposrtSlice';
import { jwtDecode } from 'jwt-decode';
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { format } from 'date-fns';

const UserReport = () => {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const userIdFromToken = jwtDecode(localStorage.getItem('token')).UserId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(fetchUserBreakDuration(userIdFromToken));
        const data = action.payload;
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching user break duration data:', error.message);
      }
    };

    fetchData();
  }, [dispatch, userIdFromToken]);

  return (
    <div>
      {fetchedData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Break Time</TableCell>
                <TableCell>Finish Break Time</TableCell>
                <TableCell>Break Duration</TableCell>
                <TableCell>Productive TIme</TableCell>
                <TableCell>Total Time</TableCell>
                {/* <TableCell>Productive Hours</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell>{new Date(row.breakStartTime).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                  <TableCell>{format(new Date(row.breakStartTime), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>{new Date(row.breakStartTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{new Date(row.finishBreakTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{row.breakDuration}</TableCell>
                  <TableCell>{row.totalProductiveHours}</TableCell>
                  <TableCell>{row.totalHours}</TableCell>
                  {/* <TableCell>{row.productiveHours}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserReport;







