






// Report.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataById } from '../slices/Report/reposrtSlice';

const Report = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchDataById());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Report Data</h2>
      {data && (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Report;

