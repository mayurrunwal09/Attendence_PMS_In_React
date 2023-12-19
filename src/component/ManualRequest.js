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
import { jwtDecode } from 'jwt-decode';

const ManualRequest = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    attendenceType: '',
    clockInTime: '',
    clockOutTime: '',
    employeeRemart: '', // Corrected the property name
    status: 'Pending',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Retrieve data by ID when the component mounts
    const token = localStorage.getItem('token');
    const userIdFromToken = jwtDecode(token).UserId;
    dispatch(getManualRequestById(userIdFromToken));
  }, [dispatch]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { attendenceType, clockInTime, clockOutTime, employeeRemart, status } = formData;

    // Extract user ID from JWT token
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).UserId;

    // Dispatch insertManualRequest thunk with the form data and user ID
    dispatch(insertManualRequest({ userId, attendenceType, clockInTime, clockOutTime, employeeRemart, status })).then(() => {
      // Reset the form after successful submission
      setFormData({
        attendenceType: '',
        clockInTime: '',
        clockOutTime: '',
        employeeRemart: '', // Corrected the property name
        status: 'Pending',
      });
      // Close the form after submission
      setIsFormVisible(false);
    });
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
            {/* Removed userId field from the form */}
            <TextField
              label="Attendance Type"
              type="text"
              name="attendenceType"
              value={formData.attendenceType}
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
              name="employeeRemart"
              value={formData.employeeRemart}
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
              <TableCell>ID</TableCell>
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
                  <TableCell>{request.id}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManualRequest;
