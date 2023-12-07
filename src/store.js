// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userSlice from './slices/User/userSlice';
import usertypeSlice from './slices/UserType/usertypeSlice';
import authSlice from './slices/authSlice';

import { leaveReducer } from './slices/Leave/leaveSlice';


const store = configureStore({
  reducer: {
    users: userSlice,
    userTypes : usertypeSlice,
    auth : authSlice,
    leave : leaveReducer,
    // Add other reducers here if needed
  },
});

export default store;
