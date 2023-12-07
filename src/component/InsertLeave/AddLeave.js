// src/component/insertLeave/AddLeave.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeave, fetchUserLeave } from '../../slices/Leave/addleaveSlice';



function AddLeave() {
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
    if (userLeaveData.userId) {
      dispatch(fetchUserLeave(userLeaveData.userId));
    }
  }, [dispatch, userLeaveData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createLeave(leaveData));
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
      <h2>Insert Leave</h2>
      <form>
   
      <form>
      <label>User ID:</label>
        <input type="number" name="userId" value={leaveData.userId} onChange={handleInputChange} />

        <label>Leave Type:</label>
        <input type="text" name="leaveType" value={leaveData.leaveType} onChange={handleInputChange} />

        <label>Start Leave Date:</label>
        <input type="datetime-local" name="startLeaveDate" value={leaveData.startLeaveDate} onChange={handleInputChange} />

        <label>End Leave Date:</label>
        <input type="datetime-local" name="endLeaveDate" value={leaveData.endLeaveDate} onChange={handleInputChange} />

   

        <label>Reason:</label>
        <input type="text" name="reason" value={leaveData.reason} onChange={handleInputChange} />

       
        <button type="button" onClick={handleSubmit}>
          Submit Leave
        </button>
      </form>
    
      </form>
      <h2>Fetch User Leave</h2>
      <form>
        <label>User ID:</label>
        <input
          type="number"
          name="userId"
          value={userLeaveData.userId}
          onChange={handleUserInputChange}
        />
        <button type="button" onClick={handleFetchUserLeave}>
          Fetch User Leave
        </button>
      </form>
     
    </div>
  );
}

export default AddLeave;






