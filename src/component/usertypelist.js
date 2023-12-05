import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTypes } from '../slices/usertypeSlice';

function UserTypeList() {
  const dispatch = useDispatch();
  const userTypes = useSelector((state) => state.userTypes.userTypes);
  const status = useSelector((state) => state.userTypes.status);
  const error = useSelector((state) => state.userTypes.error);

  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchUserTypes());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading user types...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <h2>UserType List</h2>
    <div>
      <pre>{JSON.stringify(userTypes, null, 2)}</pre>
    </div>
  </div>
  );
}

export default UserTypeList;
