
// slices/Leave/addleaveSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};



export const createLeave = createAsyncThunk('leaves/createLeave', async (leaveData,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/Leave/ApplyLeave', {
    method: 'POST',
    headers: {
    //  Authorization: `Bearer ${token}`,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leaveData),
  });
  const data = await response.json();
  return data;
});

export const deleteLeave = createAsyncThunk('leaves/deleteLeave', async (id,{getState}) => {
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


export const fetchUserLeave = createAsyncThunk(
  'leaves/fetchUserLeave',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`https://localhost:44369/api/Leave/GetLeaveByUserId?Id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        // Handle the 404 status here, e.g., return an empty array or a specific value.
        return [];
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch user leave: ${response.status}`);
      }
      const data = await response.json();
      if (!data) {
        throw new Error('Invalid response data');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






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
        // You can update the state if needed
        // state.users = updatedData;
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
     
     
    
  },
});

export const { reducer: leaveReducer } = leaveSlice;

