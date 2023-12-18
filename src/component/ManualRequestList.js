// // ManualRequestList.js
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchManualRequests, updateManualRequestStatus } from '../slices/ManualRequest/manualrequestSlice';

// const ManualRequestList = () => {
//   const dispatch = useDispatch();
//   const manualRequests = useSelector((state) => state.manualrequests.manualRequests);
//   const status = useSelector((state) => state.manualrequests.status);
//   const error = useSelector((state) => state.manualrequests.error);

//   const [selectedStatus, setSelectedStatus] = useState('');

//   useEffect(() => {
//     dispatch(fetchManualRequests());
//   }, [dispatch]);

//   const handleStatusChange = (manualRequestId) => {
//     // Check if a status is selected before dispatching the action
//     if (selectedStatus) {
//       dispatch(updateManualRequestStatus({ manualRequestId, status: selectedStatus }));
//     } else {
//       // Handle the case where no status is selected
//       console.error('Please select a status before updating.');
//     }
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Manual Requests</h2>
//       <ul>
//         {manualRequests.map((request) => (
//           <li key={request.id}>
//             <div>
//               <strong>User ID:</strong> {request.userId}
//             </div>
//             <div>
//               <strong>Attendance Type:</strong> {request.attendanceType}
//             </div>
//             <div>
//               <strong>Clock In Time:</strong> {request.clockInTime}
//             </div>
//             <div>
//               <strong>Clock Out Time:</strong> {request.clockOutTime}
//             </div>
//             <div>
//               <strong>Employee Remark:</strong> {request.employeeRemark}
//             </div>
//             <div>
//               <strong>Status:</strong> {request.status}
//             </div>
//             <div>
//               <strong>ID:</strong> {request.id}
//             </div>
//             <div>
//               <button onClick={() => handleStatusChange(request.id)}>Update Status</button>
//               <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManualRequestList;







import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManualRequests, updateManualRequestStatus } from '../slices/ManualRequest/manualrequestSlice';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider,
  Grid,
  Paper,
} from '@mui/material';

const ManualRequestList = () => {
  const dispatch = useDispatch();
  const manualRequests = useSelector((state) => state.manualrequests.manualRequests);
  const status = useSelector((state) => state.manualrequests.status);
  const error = useSelector((state) => state.manualrequests.error);

  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    dispatch(fetchManualRequests());
  }, [dispatch]);

  const handleStatusChange = (manualRequestId) => {
    // Check if a status is selected before dispatching the action
    if (selectedStatus) {
      // Dispatch the updateManualRequestStatus thunk with manualRequestId and selectedStatus
      dispatch(updateManualRequestStatus({ manualRequestId, status: selectedStatus }));
    } else {
      // Handle the case where no status is selected
      console.error('Please select a status before updating.');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Manual Requests
      </Typography>
      <List>
        {manualRequests.map((request, index) => (
          <Paper key={request.id} elevation={3} mb={3}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ListItemText
                    primary={`User ID: ${request.userId}`}
                    secondary={
                      <>
                        <Typography variant="body2">Attendance Type: {request.attendanceType}</Typography>
                        <Typography variant="body2">Clock In Time: {request.clockInTime}</Typography>
                        <Typography variant="body2">Clock Out Time: {request.clockOutTime}</Typography>
                        <Typography variant="body2">Employee Remark: {request.employeeRemark}</Typography>
                        <Typography variant="body2">Status: {request.status}</Typography>
                        <Typography variant="body2">ID: {request.id}</Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box textAlign="right">
                    <Button onClick={() => handleStatusChange(request.id)} variant="outlined" color="primary">
                      Update Status
                    </Button>
                    <FormControl sx={{ minWidth: 120, ml: 2 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
            {index < manualRequests.length - 1 && <Divider />}
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default ManualRequestList;
