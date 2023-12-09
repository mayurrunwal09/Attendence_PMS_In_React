

// slices/Leave/addleaveSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const createLeave = createAsyncThunk('leaves/createLeave', async (leaveData, { getState }) => {
  const token = getState().auth.token;
  const userIdFromToken = jwtDecode(token).UserId;
  leaveData.userId = userIdFromToken;
  try {
    const response = await fetch('https://localhost:44369/api/Leave/ApplyLeave', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leaveData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to apply leave: ${error.message}`);
  }
});

export const fetchUserLeave = createAsyncThunk('report/fetchDataById', async (_, { getState }) => {
  const token = getState().auth.token;
  const userIdFromToken = jwtDecode(token).UserId;

  try {
    const response = await fetch(`https://localhost:44369/api/Leave/GetLeaveByUserId?userId=${userIdFromToken}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to fetch report data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)

    if (!data) {
      throw new Error('Invalid response data');
    }

    return data;
  } catch (error) {
    console.error('Fetch Report Data Error:', error.message);
    throw new Error(`Failed to fetch report data: ${error.message}`);
  }
});


export const deleteLeave = createAsyncThunk('leaves/deleteLeave', async (id, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/Leave/DeleteLeave?Id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLeave.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUserLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reducer: addleaveReducer } = leaveSlice;




