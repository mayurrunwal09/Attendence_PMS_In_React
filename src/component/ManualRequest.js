
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getManualRequestById, insertManualRequest } from '../slices/ManualRequest/manualrequestSlice';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ManualRequest = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId: 0,
    attendanceType: '',
    clockInTime: '',
    clockOutTime: '',
    employeeRemark: '',
    status: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch data by ID when the component mounts
  useEffect(() => {
    dispatch(getManualRequestById(1)); // Assuming you want to fetch data for userId 1
  }, [dispatch]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch insertManualRequest thunk with the form data
    dispatch(insertManualRequest(formData));
    // Close the form after submission
    setIsFormVisible(false);
  };

  // Retrieve fetched data by ID from the state
  const fetchedData = useSelector((state) => state.manualrequests.singleManualRequest);

  return (
    <div>
      <Typography variant="h4">Insert Request</Typography>

      {/* "Add Manual Request" button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
        style={{ marginBottom: '20px' }}
      >
        Add Manual Request
      </Button>

      {/* Form to insert data */}
      {isFormVisible && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="User ID"
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Attendance Type"
              type="text"
              name="attendanceType"
              value={formData.attendanceType}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label=""
              type="datetime-local"
              name="clockInTime"
              value={formData.clockInTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label=""
              type="datetime-local"
              name="clockOutTime"
              value={formData.clockOutTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee Remark"
              type="text"
              name="employeeRemark"
              value={formData.employeeRemark}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Insert
            </Button>
          </form>
        </Paper>
      )}

      <Typography variant="h4">Fetched Data by ID</Typography>
      {/* Display fetched data by ID in a table format */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Attendance Type</TableCell>
              <TableCell>Clock In Time</TableCell>
              <TableCell>Clock Out Time</TableCell>
              <TableCell>Employee Remark</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>ID</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(fetchedData) &&
              fetchedData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.attendenceType}</TableCell>
                  <TableCell>{request.clockInTime}</TableCell>
                  <TableCell>{request.clockOutTime}</TableCell>
                  <TableCell>{request.employeeRemart}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  {/* <TableCell>{request.id}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManualRequest;
