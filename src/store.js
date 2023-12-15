// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userSlice from './slices/User/userSlice';
import usertypeSlice from './slices/UserType/usertypeSlice';
import authSlice from './slices/authSlice';

import { leaveReducer } from './slices/Leave/leaveSlice';
import reposrtSlice from './slices/Report/reposrtSlice';
import { reportReducer } from './slices/Report/reposrtSlice';
import { addleaveReducer } from './slices/Leave/addleaveSlice';
import eventSlice from './slices/Event/eventSlice';
import { sessionsReducer } from './slices/Session/sessionSlice';
import manualrequestSlice from './slices/ManualRequest/manualrequestSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
    userTypes : usertypeSlice,
    auth : authSlice,
    leave : leaveReducer,
    report : reportReducer,
    addleave : addleaveReducer,
    events : eventSlice,
    session : sessionsReducer,
    manualrequests : manualrequestSlice
    // Add other reducers here if needed
  },
});

export default store;
