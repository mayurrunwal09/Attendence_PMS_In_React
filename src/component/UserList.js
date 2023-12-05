import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../slices/userSlice';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <div>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
  );
}

export default UserList;
