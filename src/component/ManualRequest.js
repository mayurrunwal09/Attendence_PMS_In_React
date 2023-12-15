// InsertRequest.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getManualRequestById,insertManualRequest } from '../slices/ManualRequest/manualrequestSlice';

const ManualRequest = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId: 1,
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
          UserID:
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Attendence Type:
          <input
            type="text"
            name="attendenceType"
            value={formData.attendenceType}
            onChange={handleChange}
          />
        </label>
        {/* Add other input fields for clockInTime, clockOutTime, employeeRemart, status, etc. */}
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
          Remark:
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
        {/* Add other input fields here */}
        <br />
        <button type="submit">Insert</button>
      </form>

      <hr />

      <h2>Fetched Data by ID</h2>
      {/* Display fetched data by ID */}
      <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
    </div>
  );
};

export default ManualRequest;
