import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeave, fetchUserLeave } from '../../slices/Leave/addleaveSlice';
import { useAuth } from '../../AuthContext';
import { jwtDecode } from 'jwt-decode';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'

function AddLeave() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const status = useSelector((state) => state.addleave.status);
  const error = useSelector((state) => state.addleave.error);
  const fetchedUserData = useSelector((state) => state.addleave.users);

  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    startLeaveDate: '',
    endLeaveDate: '',
    reason: '',
    isApproved: true,
    isRejected: true,
  });

  const token = localStorage.getItem('token');
  const userIdFromToken = jwtDecode(token).UserId;

  useEffect(() => {
    if (userIdFromToken) {
      dispatch(fetchUserLeave(userIdFromToken));
    }
  }, [dispatch, userIdFromToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createLeave(leaveData));
  };

  const handleFetchUserLeave = () => {
    if (userIdFromToken) {
      dispatch(fetchUserLeave(userIdFromToken));
    }
  };

  return (
    <div>
      <h2>Insert Leave</h2>
      <form>
        <label>Leave Type:</label>
     
        <FormControl fullWidth>
          <InputLabel id="leave-type-label">Leave Type</InputLabel>
          <Select
            labelId="leave-type-label"
            id="leave-type"
            name="leaveType"
            value={leaveData.leaveType}
            onChange={handleInputChange}
          >
            <MenuItem value="FullDay">Full Day</MenuItem>
            <MenuItem value="FirstHalf">First Half</MenuItem>
            <MenuItem value="SecondHalf">Second Half</MenuItem>
            <MenuItem value="EarlyLeave">Early Leave</MenuItem>
            <MenuItem value="LateComing">Late Coming</MenuItem>
            <MenuItem value="PersonalBreak">Personal Break</MenuItem>
            <MenuItem value="OfficialBreak">Official Break</MenuItem>
          </Select>
        </FormControl>
        <label>Start Leave Date:</label>
        <TextField
          type="datetime-local"
          name="startLeaveDate"
          value={leaveData.startLeaveDate}
          onChange={handleInputChange}
          fullWidth
        />
        <label>End Leave Date:</label>
        <TextField
          type="datetime-local"
          name="endLeaveDate"
          value={leaveData.endLeaveDate}
          onChange={handleInputChange}
          fullWidth
        />
        <label>Reason:</label>
        <TextField
          type="text"
          name="reason"
          value={leaveData.reason}
          onChange={handleInputChange}
          fullWidth
        />
      </form>
      <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
        Submit Leave
      </Button>

      <h2>Fetch User Leave</h2>
      <form>
        {fetchedUserData && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Approval Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedUserData.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.startLeaveDate}</TableCell>
                    <TableCell>{leave.endLeaveDate}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>{leave.approvalStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button type="button" variant="contained" color="primary" onClick={handleFetchUserLeave}>
          Fetch User Leave
        </Button>
      </form>
    </div>
  );
}

export default AddLeave;
