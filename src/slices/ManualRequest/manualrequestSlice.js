// manualrequestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  manualRequests: [],
  singleManualRequest: null,
  status: 'idle',
  error: null,
};

export const fetchManualRequests = createAsyncThunk('manualrequests/fetchManualRequests', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/ManualRequest/GetAllManualRequests', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data)
  return data;
});

export const insertManualRequest = createAsyncThunk(
  'manualrequests/insertManualRequest',
  async (requestData, { getState }) => {
    const token = getState().auth.token;

    const response = await fetch('https://localhost:44369/api/ManualRequest/InsertManualRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to insert manual request. Server response: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  }
);



// Create an asynchronous thunk for fetching a manual request by user ID
export const getManualRequestById = createAsyncThunk(
  'manualrequests/getManualRequestById',
  async (userId, { getState }) => {
    const token = getState().auth.token;

    const response = await fetch(`https://localhost:44369/api/ManualRequest/GetManualRequestByUserId?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch manual request by user ID');
    }

    const data = await response.json();
    return data;
  }
);


export const updateManualRequestStatus = createAsyncThunk(
  'manualApproval/updateManualRequestStatus',
  async ({ manualRequestId, newStatus }, { rejectWithValue }) => {
    console.log('manualRequestId', manualRequestId);
    console.log('newStatus', newStatus);

    try {
      const response = await fetch(`https://localhost:44369/api/ManualRequest/UpdateManualRequestStatus?manualRequestId=${manualRequestId}&newStatus=${newStatus} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newStatus: String(newStatus) }),

      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the manualrequestSlice
const manualrequestSlice = createSlice({
  name: 'manualrequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManualRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchManualRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.manualRequests = action.payload;
      })
      .addCase(fetchManualRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertManualRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.manualRequests.push(action.payload);
      })
      .addCase(getManualRequestById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleManualRequest = action.payload;
      })
      
      .addCase(updateManualRequestStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update the state if needed after updating the status
      });
  },
});

export default manualrequestSlice.reducer;
























