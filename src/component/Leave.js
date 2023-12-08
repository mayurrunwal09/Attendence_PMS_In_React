
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchLeave,
//   createLeave,
//   rejectLeave,
//   approvedLeave,
//   fetchUserLeave,
// } from '../slices/Leave/leaveSlice';


// function Leave() {
//   const dispatch = useDispatch();
//   const leaves = useSelector((state) => state.leave.users);
//   const status = useSelector((state) => state.leave.status);
//   const error = useSelector((state) => state.leave.error);

//   const [leaveData, setLeaveData] = useState({
//     userId: 0,
//     leaveType: '',
//     startLeaveDate: '',
//     endLeaveDate: '',
//     reason: '',
//     isApproved: true,
//     isRejected: true,
//   });

//   const [showRejectInput, setShowRejectInput] = useState(false);
//   const [rejectLeaveId, setRejectLeaveId] = useState('');
//   const [userLeaveData, setUserLeaveData] = useState({
//     userId: 0,
//   });

//   useEffect(() => {
//     dispatch(fetchLeave());
//   }, [dispatch]);

//   useEffect(() => {
//     if (userLeaveData.userId) {
//       dispatch(fetchUserLeave(userLeaveData.userId));
//     }
//   }, [dispatch, userLeaveData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLeaveData({ ...leaveData, [name]: value });
//   };


//   const handleRejectLeave = (leaveId) => {
//     if (leaveId) {
//       dispatch(rejectLeave(leaveId));
//       setShowRejectInput(false);
//     } else {
//       console.error('Invalid leaveId');
//     }
//   };

//   const handleApproveLeave = (leaveId) => {
//     if (leaveId) {
//       dispatch(approvedLeave(leaveId));
//     } else {
//       console.error('Invalid leaveId');
//     }
//   };

//   const handleUserInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserLeaveData({ ...userLeaveData, [name]: value });
//   };

//   const handleFetchUserLeave = async () => {
//     if (userLeaveData.userId) {
//       try {
//         const result = await dispatch(fetchUserLeave(userLeaveData.userId));
        
//         // Check the result and handle it accordingly
//         if (fetchUserLeave.fulfilled.match(result)) {
//           // The data is available in result.payload
//           console.log('User Leave Data:', result.payload);
//         } else if (fetchUserLeave.rejected.match(result)) {
//           // Handle the rejection
//           console.error('Failed to fetch user leave:', result.error.message);
//         }
//       } catch (error) {
//         // Handle unexpected errors
//         console.error('Unexpected error:', error.message);
//       }
//     } else {
//       console.error('Invalid userId');
//     }
//   };
  

//   const toggleRejectInput = () => {
//     setShowRejectInput(!showRejectInput);
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div >
//       <h2>Leave List</h2>
//       <table>
//         <thead>
//           <tr>
//           <th> ID</th>
//             <th>User ID</th>
//             <th>Leave Type</th>
//             <th>Start Leave Date</th>
//             <th>End Leave Date</th>
//             <th>Reason</th>
//             <th>Request Time</th>
//             <th>ApprovalTime</th>        
//             <th>Approval Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.leaveId}>
//                <td>{leave.id}</td>
//               <td>{leave.userId}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.startLeaveDate}</td>
//               <td>{leave.endLeaveDate}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.requestTime}</td>
//               <td>{leave.approvalTime}</td>
//               <td>{leave.approvalStatus}</td>
//               <td>
//               <button
//                   type="button"
//                   onClick={() => {
//                     console.log('Reject leaveId:', leave.id);
//                     handleRejectLeave(leave.id);
//                   }}
//                 >
//                   Reject
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     console.log('Approve leaveId:', leave.id);
//                     handleApproveLeave(leave.id);
//                   }}
//                 >
//                   Approve
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Leave;








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
        console.error('Unexpected error:', error.message);
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
              <TableCell>User ID</TableCell>
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
                <TableCell>{leave.userId}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startLeaveDate}</TableCell>
                <TableCell>{leave.endLeaveDate}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>{leave.requestTime}</TableCell>
                <TableCell>{leave.approvalTime}</TableCell>
                <TableCell>{leave.approvalStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      console.log('Reject leaveId:', leave.id);
                      handleRejectLeave(leave.id);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log('Approve leaveId:', leave.id);
                      handleApproveLeave(leave.id);
                    }}
                  >
                    Approve
                  </Button>
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
