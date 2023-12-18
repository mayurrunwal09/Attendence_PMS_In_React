// src/slices/Event/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

// Create an asynchronous thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch('https://localhost:44369/api/Event/GetAllEvents');
  const data = await response.json();
  return data;
});

// Create an asynchronous thunk for creating an event
export const createEvent = createAsyncThunk('events/createEvent', async (event) => {
  const response = await fetch('https://localhost:44369/api/Event/InsertEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  const data = await response.json();
  return data;
});

// Create an asynchronous thunk for updating an event
export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const response = await fetch('https://localhost:44369/api/Event/UpdateEvent', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  const data = await response.json();
  return data;
});

// Create an asynchronous thunk for deleting an event
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId) => {
  const response = await fetch(`https://localhost:44369/api/Event/DeleteEvent?Id=${eventId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create the event slice
const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedEventIndex = state.events.findIndex((event) => event.id === action.payload.id);
        if (updatedEventIndex !== -1) {
          state.events[updatedEventIndex] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = state.events.filter((event) => event.id !== action.payload.id);
      });
  },
});

// Export the asynchronous thunks for use in components


// Export the reducer
export default eventSlice.reducer;
