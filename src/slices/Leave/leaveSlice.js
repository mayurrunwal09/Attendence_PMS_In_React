






// slices/Leave/leaveSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchLeave = createAsyncThunk('leaves/fetchLeaves', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/Leave/GetAllLeaveForHR', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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






export const rejectLeave = createAsyncThunk('leaves/rejectLeave', async (leaveId,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/Leave/RejectLeave/${leaveId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
});




export const approvedLeave = createAsyncThunk('leaves/approvedLeave', async (leaveId,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/Leave/ApproveLeave/${leaveId}`, {
    method: 'PUT',
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
      .addCase(fetchLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeave.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
      
      
      .addCase(rejectLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You can update the state if needed
        // state.users = updatedData;
      })
      .addCase(rejectLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    
  },
});

export const { reducer: leaveReducer } = leaveSlice;

