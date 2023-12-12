// slices/User/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch user data from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/User/GetAllUser', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});



export const updateUser = createAsyncThunk('users/updateUser', async (userTypeData,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/User/UpdateUser', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userTypeData),
  });
  const data = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk('userTypes/deleteUser', async (id,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/User/DeleteUser?Id=${id}`, {

    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
 
  return data;
});


export const fetchUserTypeById = createAsyncThunk('users/fetchUserTypeById', async (userId, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/User/GetUser?Id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
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


