


// // src/component/insertLeave/AddLeave.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createLeave, fetchUserLeave } from '../../slices/Leave/addleaveSlice';
// import { useAuth } from '../../AuthContext';

// function AddLeave() {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const leaves = useSelector((state) => state.leave.users);
//   const status = useSelector((state) => state.leave.status);
//   const error = useSelector((state) => state.leave.error);

//   const [leaveData, setLeaveData] = useState({
//     leaveType: '',
//     startLeaveDate: '',
//     endLeaveDate: '',
//     reason: '',
//     isApproved: true,
//     isRejected: true,
//   });

//   const [userLeaveData, setUserLeaveData] = useState({
//     userId: 0,
//   });

//   const [fetchedUserData, setFetchedUserData] = useState(null); // Add this line

//   useEffect(() => {
//     dispatch(fetchUserLeave());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLeaveData({ ...leaveData, [name]: value });
//   };

//   const handleSubmit = () => {
//     dispatch(createLeave(leaveData));
//   };

//   const handleUserInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserLeaveData({ ...userLeaveData, [name]: value });
//   };

//   const handleFetchUserLeave = async () => {
//     try {
//       if (!userLeaveData.userId) {
//         console.error('Invalid userId');
//         return;
//       }

//       console.log('Fetching user leave for userId:', userLeaveData.userId);

//       const result = await dispatch(fetchUserLeave(userLeaveData.userId));

//       if (fetchUserLeave.fulfilled.match(result)) {
//         const stringifiedData = JSON.stringify(result.payload);
//         console.log('User Leave Data (Stringified):', stringifiedData);
//         setFetchedUserData(result.payload); // Add this line
//       } else if (fetchUserLeave.rejected.match(result)) {
//         console.error('Failed to fetch user leave:', result.error.message);
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error.message);
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
//       <h2>Insert Leave</h2>
//       <form>
//         <label>Leave Type:</label>
//         <input type="text" name="leaveType" value={leaveData.leaveType} onChange={handleInputChange} />
//         <label>Start Leave Date:</label>
//         <input type="datetime-local" name="startLeaveDate" value={leaveData.startLeaveDate} onChange={handleInputChange} />
//         <label>End Leave Date:</label>
//         <input type="datetime-local" name="endLeaveDate" value={leaveData.endLeaveDate} onChange={handleInputChange} />
//         <label>Reason:</label>
//         <input type="text" name="reason" value={leaveData.reason} onChange={handleInputChange} />
//         <button type="button" onClick={handleSubmit}>
//           Submit Leave
//         </button>
//       </form>
//       <h2>Fetch User Leave</h2>
//       <form>
//         {fetchedUserData && (
//           <div>
//             <h3>Fetched User Data</h3>
//             <pre>{JSON.stringify(fetchedUserData, null, 2)}</pre>
//           </div>
//         )}
//         <label>User ID:</label>
//         <input
//           type="number"
//           name="userId"
//           value={userLeaveData.userId}
//           onChange={handleUserInputChange}
//         />
//         <button type="button" onClick={handleFetchUserLeave}>
//           Fetch User Leave
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddLeave;









// src/component/insertLeave/AddLeave.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeave, fetchUserLeave } from '../../slices/Leave/addleaveSlice';
import { useAuth } from '../../AuthContext';

function AddLeave() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const leaves = useSelector((state) => state.leave.users);
  const status = useSelector((state) => state.leave.status);
  const error = useSelector((state) => state.leave.error);

  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    startLeaveDate: '',
    endLeaveDate: '',
    reason: '',
    isApproved: true,
    isRejected: true,
  });

  useEffect(() => {
    // Fetch user leave data for the logged-in user
    if (leaves && leaves.userId) {
      dispatch(fetchUserLeave(leaves.userId));
    }
  }, [dispatch, leaves]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = () => {
    // Create leave for the logged-in user
    dispatch(createLeave(leaveData));
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
      <h2>Fetched User Data</h2>
      {leaves && (
        <div>
          <pre>{JSON.stringify(leaves, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AddLeave;


