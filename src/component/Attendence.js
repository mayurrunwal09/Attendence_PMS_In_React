

// // Report.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDataById } from '../slices/Report/reposrtSlice';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TableBorder,
// } from '@mui/material';
// import { format } from 'date-fns';

// const Attendence = () => {
//   const dispatch = useDispatch();
//   const { data, status, error } = useSelector((state) => state.report);

//   useEffect(() => {
//     dispatch(fetchDataById());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <Typography variant="h4">Attendence</Typography>
//       {data && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Day</TableCell> 
//                 <TableCell>User Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Clock In</TableCell>
//                 <TableCell>Clock Out</TableCell>
//                 <TableCell>Breaks</TableCell>
//                 <TableCell>Total Productive Hours</TableCell>
//                 <TableCell>Total Hours</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((entry, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{entry.userId}</TableCell>
//                   <TableCell>{new Date(entry.clockInTimes).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>

//                   <TableCell>{entry.userName}</TableCell>
//                   <TableCell>{entry.email}</TableCell>
//                   <TableCell>{format(new Date(entry.date), 'yyyy-MM-dd')}</TableCell>
//                   <TableCell>{entry.clockInTimes.join(', ')}</TableCell>
//                   <TableCell>{entry.clockOutTimes.join(', ')}</TableCell>
//                   <TableCell>
//                     <Table>
//                       <TableBody>
//                         {entry.startBreakTimes.map((startBreak, i) => (
//                           <TableRow key={i}>
//                             <TableCell>Start Break {i + 1}</TableCell>
//                             <TableCell>{startBreak}</TableCell>
//                             <TableCell>Finish Break {i + 1}</TableCell>
//                             <TableCell>{entry.finishBreakTimes[i]}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableCell>
//                   <TableCell>{entry.totalProductiveHours}</TableCell>
//                   <TableCell>{entry.totalHours}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default Attendence;











// Report.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataById } from '../slices/Report/reposrtSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableBorder,
} from '@mui/material';
import { format } from 'date-fns';

const Attendence = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchDataById());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  const parseDate = (dateString) => {
    try {
      // Attempt to parse the date string
      const parsedDate = new Date(dateString);

      if (isNaN(parsedDate)) {
        console.error('Invalid date:', dateString);
        return null; // Return null for invalid dates
      }

      return parsedDate;
    } catch (error) {
      console.error('Error parsing date:', error);
      return null; // Return null for any errors during parsing
    }
  };
  return (
    <div>
    <Typography variant="h4">Attendance</Typography>
    {data && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Breaks</TableCell>
              <TableCell>Total Productive Hours</TableCell>
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.userId}</TableCell>
                <TableCell>{new Date(entry.clockInTimes[0]).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                <TableCell>{entry.userName}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>{format(new Date(entry.date), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{entry.clockInTimes.map((date) => parseDate(date)?.toLocaleTimeString()).join(', ')}</TableCell>
                <TableCell>{entry.clockOutTimes.map((date) => parseDate(date)?.toLocaleTimeString()).join(', ')}</TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      {entry.startBreakTimes.map((startBreak, i) => (
                        <TableRow key={i}>
                          <TableCell>Start Break {i + 1}</TableCell>
                          <TableCell>{parseDate(startBreak)?.toLocaleTimeString()}</TableCell>
                          <TableCell>Finish Break {i + 1}</TableCell>
                          <TableCell>{parseDate(entry.finishBreakTimes[i])?.toLocaleTimeString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>{entry.totalProductiveHours}</TableCell>
                <TableCell>{entry.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </div>
  );
};

export default Attendence;











