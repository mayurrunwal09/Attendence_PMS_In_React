import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserTypes = createAsyncThunk('userTypes/fetchUserTypes', async () => {
  const response = await fetch('https://localhost:44369/api/UserType/GetAllUserType');
  const data = await response.json();
  return data;
});

const userTypeSlice = createSlice({
  name: 'userTypes',
  initialState: {
    userTypes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userTypes = action.payload;
      })
      .addCase(fetchUserTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export default userTypeSlice.reducer;



