import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch user data from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://localhost:44369/api/User/GetAllUser');
  const data = await response.json();
  return data;
});

// Create a slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default userSlice.reducer;


