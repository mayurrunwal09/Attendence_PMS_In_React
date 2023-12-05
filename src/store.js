import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userSlice from './slices/userSlice';
import usertypeSlice from './slices/usertypeSlice';
import authSlice from './slices/authSlice';
import leaveSlice from './slices/leaveSlice';



const store = configureStore({
  reducer: {
    users: userSlice,
    userTypes : usertypeSlice,
    auth : authSlice,
    leave : leaveSlice,
    // Add other reducers here if needed
  },
});

export default store;
