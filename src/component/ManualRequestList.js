

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchManualRequests } from '../slices/ManualRequest/manualrequestSlice';

// const ManualRequestList = () => {
//   const dispatch = useDispatch();
//   const manualRequests = useSelector((state) => state.manualrequests.manualRequests);
//   const status = useSelector((state) => state.manualrequests.status);
//   const error = useSelector((state) => state.manualrequests.error);

//   useEffect(() => {
//     // Dispatch the fetchManualRequests action when the component mounts
//     dispatch(fetchManualRequests());
//   }, [dispatch]);

  

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
//               <strong>Employee Remark:</strong> {request.employeeRemart}
//             </div>
//             <div>
//               <strong>Status:</strong> {request.status}
//             </div>
//             <div>
//               <strong>ID:</strong> {request.id}
//             </div>
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManualRequestList;







// ManualRequestList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManualRequests, updateManualRequestStatus } from '../slices/ManualRequest/manualrequestSlice';

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
    <div>
      <h2>Manual Requests</h2>
      <ul>
        {manualRequests.map((request) => (
          <li key={request.id}>
            <div>
              <strong>User ID:</strong> {request.userId}
            </div>
            <div>
              <strong>Attendance Type:</strong> {request.attendanceType}
            </div>
            <div>
              <strong>Clock In Time:</strong> {request.clockInTime}
            </div>
            <div>
              <strong>Clock Out Time:</strong> {request.clockOutTime}
            </div>
            <div>
              <strong>Employee Remark:</strong> {request.employeeRemark}
            </div>
            <div>
              <strong>Status:</strong> {request.status}
            </div>
            <div>
              <strong>ID:</strong> {request.id}
            </div>
            <div>
              <button onClick={() => handleStatusChange(request.id)}>Update Status</button>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualRequestList;
