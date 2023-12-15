// manualrequestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  manualRequests: [],
  singleManualRequest: null,
  status: 'idle',
  error: null,
};

// Create an asynchronous thunk for fetching all manual requests from the API
export const fetchManualRequests = createAsyncThunk('manualrequests/fetchManualRequests', async () => {
    const response = await fetch('https://localhost:44369/api/ManualRequest/GetAllManualRequests');
  
    if (!response.ok) {
      throw new Error('Failed to fetch manual requests');
    }
  
    const data = await response.json();
    console.log(data);
    return data;

  });

// Create an asynchronous thunk for inserting a manual request
export const insertManualRequest = createAsyncThunk(
  'manualrequests/insertManualRequest',
  async (requestData) => {
    const response = await fetch('https://localhost:44369/api/ManualRequest/InsertManualRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to insert manual request');
    }

    const data = await response.json();
    return data;
  }
);

// Create an asynchronous thunk for fetching a manual request by user ID
export const getManualRequestById = createAsyncThunk(
  'manualrequests/getManualRequestById',
  async (userId) => {
    const response = await fetch(`https://localhost:44369/api/ManualRequest/GetManualRequestByUserId?userId=${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch manual request by user ID');
    }

    const data = await response.json();
    return data;
  }
);

// Create the manualrequestSlice
const manualrequestSlice = createSlice({
  name: 'manualrequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ... other cases
      .addCase(insertManualRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.manualRequests.push(action.payload); // Assuming the API returns the inserted manual request
      })
      .addCase(getManualRequestById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleManualRequest = action.payload;
      });
  },
});

export default manualrequestSlice.reducer;
