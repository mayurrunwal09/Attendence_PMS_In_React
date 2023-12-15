// ManualRequestList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManualRequests } from '../slices/ManualRequest/manualrequestSlice';

const ManualRequestList = () => {
  const dispatch = useDispatch();
  const manualRequests = useSelector((state) => state.manualrequests.manualRequests);
  const status = useSelector((state) => state.manualrequests.status);
  const error = useSelector((state) => state.manualrequests.error);

  useEffect(() => {
    
    dispatch(fetchManualRequests());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
console.log(manualRequests)
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Manual Requests</h2>
      <ul>
        {manualRequests.map((request) => (
          <li key={request.id}>
            <pre>{JSON.stringify(request, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualRequestList;
