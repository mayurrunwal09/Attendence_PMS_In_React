// slices/Session/sessionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  sessions: [],
  status: 'idle',
  error: null,
};

export const fetchAllSessions = createAsyncThunk('sessions/fetchAllSessions', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/Sessions/GetAllSessions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

  
export const fetchUserSessions = createAsyncThunk(
  'sessions/fetchUserLeave',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.UserId; // Make sure to use the correct property name

    try {
      const response = await fetch(`https://localhost:44369/api/Sessions/GetUserSessions?userId=${userId}`, {
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





export const postSession = createAsyncThunk('sessions/postSession', async (sessionData, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('https://localhost:44369/api/Sessions/PostSession', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  });
  const data = await response.json();
  return data;
});

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchAllSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchUserSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You can update the state if needed
        // state.sessions = updatedData;
      })
      .addCase(postSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reducer: sessionsReducer } = sessionSlice;






