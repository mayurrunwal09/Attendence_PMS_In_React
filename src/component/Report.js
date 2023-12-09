






// // Report.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDataById } from '../slices/Report/reposrtSlice';

// const Report = () => {
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
//       <h2>Report Data</h2>
//       {data && (
//         <div>
//           <h3>Data:</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Report;





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
} from '@mui/material';
import { format } from 'date-fns';

const Report = () => {
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

  return (
    <div>
      <h2>Report Data</h2>
      {data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Clock In Times</TableCell>
                <TableCell>Clock Out Times</TableCell>
                <TableCell>Start Break Times</TableCell>
                <TableCell>Finish Break Times</TableCell>
                <TableCell>Total Productive Hours</TableCell>
                <TableCell>Total Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.userId}</TableCell>
                  <TableCell>{entry.userName}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{format(new Date(entry.date), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>{entry.clockInTimes.join(', ')}</TableCell>
                  <TableCell>{entry.clockOutTimes.join(', ')}</TableCell>
                  <TableCell>{entry.startBreakTimes.join(', ')}</TableCell>
                  <TableCell>{entry.finishBreakTimes.join(', ')}</TableCell>
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

export default Report;
