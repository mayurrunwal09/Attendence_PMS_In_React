import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch user data from the API
export const fetchLeave = createAsyncThunk('leaves/fetchLeaves', async () => {
  const response = await fetch('https://localhost:44369/api/Leave/GetAllLeaveForHR');
  const data = await response.json();
  return data;
});

// Create a slice
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
      });
  },
});

// Export the reducer
export default leaveSlice.reducer;


