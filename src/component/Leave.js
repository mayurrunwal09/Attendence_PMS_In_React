import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeave } from '../slices/leaveSlice';

function Leave() {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.users); 
  const status = useSelector((state) => state.leave.status); 
  const error = useSelector((state) => state.leave.error); 

  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchLeave());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leave List</h2>
      <div>
        <pre>{JSON.stringify(leaves, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Leave;
