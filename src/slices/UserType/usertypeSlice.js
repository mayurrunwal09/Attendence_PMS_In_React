// slices/UserType/usertypeSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchUserTypes = createAsyncThunk('userTypes/fetchUserTypes', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/UserType/GetAllUserType', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});


export const createUserType = createAsyncThunk('userTypes/createUserType', async (userTypeData,{ getState}) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/UserType/InsertUserType', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userTypeData),
  });
  const data = await response.json();
  return data;
});
export const updateUserType = createAsyncThunk('userTypes/updateUserType', async (userTypeData,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/UserType/UpdateUserType', {
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

export const deleteUserType = createAsyncThunk('userTypes/deleteUserType', async (id,{getState}) => {
  const token = getState().auth.token;
  const response = await fetch(`https://localhost:44369/api/UserType/DeleteUserType?Id=${id}`, {
  
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
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
      })
      .addCase(createUserType.fulfilled, (state, action) => {
        // Optionally, you can update the state after successfully inserting a user type
        state.userTypes.push(action.payload);
      });
  },
});

export default userTypeSlice.reducer;
