


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

  const handleStatusChange = async (manualRequestId, newStatus) => {
    
    if (selectedStatus) {
      
      try {
        await dispatch(updateManualRequestStatus({ manualRequestId, newStatus }));
       
        console.log('Status updated successfully!');
      } catch (error) {
       
        console.error('Error updating status:', error);
      }
    } else {
      
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
                    primary={`User Name: ${request.userName}`}
                    secondary={
                      <>
                        <Typography variant="body2">Attendance Type: {request.attendenceType}</Typography>
                        <Typography variant="body2">Clock In Time: {request.clockInTime}</Typography>
                        <Typography variant="body2">Clock Out Time: {request.clockOutTime}</Typography>
                        <Typography variant="body2">Employee Remark: {request.employeeRemart}</Typography>
                        <Typography variant="body2">Status: {request.status}</Typography>
                        <Typography variant="body2">ID: {request.id}</Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box textAlign="right">
                    <Button
                      onClick={() => handleStatusChange(request.id, selectedStatus)}
                      variant="outlined"
                      color="primary"
                    >
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
