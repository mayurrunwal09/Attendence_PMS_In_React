
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserDataByUserId } from '../slices/Report/reposrtSlice';
import { jwtDecode } from 'jwt-decode';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';

const UserReport1 = () => {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const userIdFromToken = jwtDecode(localStorage.getItem('token')).UserId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(fetchUserDataByUserId());
        const data = action.payload;
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, [dispatch, userIdFromToken]);

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  // Function to count occurrences of each time in an array
  const countOccurrences = (arr) => {
    const countMap = new Map();
    arr.forEach((time) => {
      countMap.set(time, (countMap.get(time) || 0) + 1);
    });
    return countMap;
  };

  // Count occurrences for start break times and finish break times
  const startBreakTimesCount = countOccurrences(
    fetchedData.flatMap((item) => item.startBreakTimes)
  );
  const finishBreakTimesCount = countOccurrences(
    fetchedData.flatMap((item) => item.finishBreakTimes)
  );

  return (
    <div>
      <h1>User Report</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Break Times</TableCell>
              <TableCell>Finish Break Times</TableCell>
              <TableCell>Break Durations</TableCell>
              <TableCell>Productive TIme</TableCell>
              <TableCell>Total Actual Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(item.date), 'EEEE')}</TableCell>
                <TableCell>{format(new Date(item.date), 'yyyy-MM-dd')}</TableCell>
                <TableCell>
                  <ul>
                    {item.startBreakTimes.map((time, timeIndex) => (
                      <li key={timeIndex}>{format(new Date(time), 'HH:mm:ss')}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {item.finishBreakTimes.map((time, timeIndex) => (
                      <li key={timeIndex}>{format(new Date(time), 'HH:mm:ss')}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {item.breakDurations.map((duration, durationIndex) => (
                      <li key={durationIndex}>{duration}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{item.totalProductiveHours}</TableCell>
                <TableCell>{item.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserReport1;
