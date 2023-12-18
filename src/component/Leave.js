import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import {
  fetchLeave,
  createLeave,
  rejectLeave,
  approvedLeave,
  fetchUserLeave,
} from '../slices/Leave/leaveSlice';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

function Leave() {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.users);
  const status = useSelector((state) => state.leave.status);
  const error = useSelector((state) => state.leave.error);
  

  const [leaveData, setLeaveData] = useState({
    userId: 0,
    leaveType: '',
    startLeaveDate: '',
    endLeaveDate: '',
    reason: '',
    isApproved: true,
    isRejected: true,
  });

  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectLeaveId, setRejectLeaveId] = useState('');
  const [userLeaveData, setUserLeaveData] = useState({
    userId: 0,
  });

  useEffect(() => {
    dispatch(fetchLeave());
  }, [dispatch]);

  useEffect(() => {
    if (userLeaveData.userId) {
      dispatch(fetchUserLeave(userLeaveData.userId));
    }
  }, [dispatch, userLeaveData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleRejectLeave = (leaveId) => {
    if (leaveId) {
      dispatch(rejectLeave(leaveId));
      setShowRejectInput(false);
    } else {
      console.error('Invalid leaveId');
    }
  };

  const handleApproveLeave = (leaveId) => {
    if (leaveId) {
      dispatch(approvedLeave(leaveId));
    } else {
      console.error('Invalid leaveId');
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserLeaveData({ ...userLeaveData, [name]: value });
  };

  const handleFetchUserLeave = async () => {
    if (userLeaveData.userId) {
      try {
        const result = await dispatch(fetchUserLeave(userLeaveData.userId));

        // Check the result and handle it accordingly
        if (fetchUserLeave.fulfilled.match(result)) {
          // The data is available in result.payload
          console.log('User Leave Data:', result.payload);
        } else if (fetchUserLeave.rejected.match(result)) {
          // Handle the rejection
          console.error('Failed to fetch user leave:', result.error.message);
        }
      } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error');
      }
    } else {
      console.error('Invalid userId');
    }
  };

  const toggleRejectInput = () => {
    setShowRejectInput(!showRejectInput);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

 
  return (
    <div>
      <h2>Leave List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Leave Date</TableCell>
              <TableCell>End Leave Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Request Time</TableCell>
              <TableCell>ApprovalTime</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.leaveId}>
                <TableCell>{leave.id}</TableCell>
                <TableCell>{leave.userName}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startLeaveDate}</TableCell>
                <TableCell>{leave.endLeaveDate}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>{leave.requestTime}</TableCell>
                <TableCell>{leave.approvalTime}</TableCell>
                <TableCell>{leave.approvalStatus}</TableCell>
                <TableCell>
                  <CheckIcon
                    style={{ color: 'green', cursor: 'pointer',fontSize: 44 }}
                    onClick={() => {
                      console.log('Approve leaveId:', leave.id);
                      handleApproveLeave(leave.id);
                    }}
                  />
                  <CancelIcon
                    style={{ color: 'red', cursor: 'pointer', marginLeft: '8px' ,fontSize: 44}}
                    onClick={() => {
                      console.log('Reject leaveId:', leave.id);
                      handleRejectLeave(leave.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Leave;






















































