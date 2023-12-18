
// InsertRequest.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getManualRequestById, insertManualRequest } from '../slices/ManualRequest/manualrequestSlice';

const ManualRequest = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId: 0,
    attendenceType: '',
    clockInTime: '',
    clockOutTime: '',
    employeeRemart: '',
    status: '',
  });

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
  };

  // Retrieve fetched data by ID from the state
  const fetchedData = useSelector((state) => state.manualrequests.singleManualRequest);

  return (
    <div>
      <h2>Insert Request</h2>

      {/* Form to insert data */}
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Attendance Type:
          <input
            type="text"
            name="attendenceType"
            value={formData.attendenceType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Clock In Time:
          <input
            type="datetime-local"
            name="clockInTime"
            value={formData.clockInTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Clock Out Time:
          <input
            type="datetime-local"
            name="clockOutTime"
            value={formData.clockOutTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employee Remark:
          <input
            type="text"
            name="employeeRemart"
            value={formData.employeeRemart}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Insert</button>
      </form>

      <hr />

      <h2>Fetched Data by ID</h2>
      {/* Display fetched data by ID in a list format */}
      <ul>
        {Array.isArray(fetchedData) &&
          fetchedData.map((request) => (
            <li key={request.id}>
              <div>
                <strong>User ID:</strong> {request.userId}
              </div>
              <div>
                <strong>Attendance Type:</strong> {request.attendenceType}
              </div>
              <div>
                <strong>Clock In Time:</strong> {request.clockInTime}
              </div>
              <div>
                <strong>Clock Out Time:</strong> {request.clockOutTime}
              </div>
              <div>
                <strong>Employee Remark:</strong> {request.employeeRemart}
              </div>
              <div>
                <strong>Status:</strong> {request.status}
              </div>
              <div>
                <strong>ID:</strong> {request.id}
              </div>
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ManualRequest;














// // InsertRequest.js
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { insertManualRequest } from '../slices/ManualRequest/manualrequestSlice';
// import { jwtDecode } from 'jwt-decode';


// const ManualRequest = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     attendenceType: '',
//     clockInTime: '',
//     clockOutTime: '',
//     employeeRemart: '',
//     status: '',
//   });

//   // Get userId from JWT token in local storage using jwt-decode
//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setFormData((prevData) => ({ ...prevData, userId: decodedToken.userId }));
//       } catch (error) {
//         console.error('Error decoding JWT token:', error);
//       }
//     }
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dispatch insertManualRequest thunk with the form data
//     dispatch(insertManualRequest(formData));
//   };

//   return (
//     <div>
//       <h2>Insert Request</h2>

//       {/* Form to insert data */}
//       <form onSubmit={handleSubmit}>
//         {/* Remove User ID input field */}
//         <label>
//           Attendence Type:
//           <input
//             type="text"
//             name="attendenceType"
//             value={formData.attendenceType}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Clock In Time:
//           <input
//             type="datetime-local"
//             name="clockInTime"
//             value={formData.clockInTime}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Clock Out Time:
//           <input
//             type="datetime-local"
//             name="clockOutTime"
//             value={formData.clockOutTime}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Employee Remark:
//           <input
//             type="text"
//             name="employeeRemart"
//             value={formData.employeeRemart}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Status:
//           <input
//             type="text"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Insert</button>
//       </form>
//     </div>
//   );
// };

// export default ManualRequest;

