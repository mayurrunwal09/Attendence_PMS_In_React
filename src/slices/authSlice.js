// // authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: localStorage.getItem('token') || null,
//     isAuthenticated: Boolean(localStorage.getItem('token')),
//   },
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//       state.isAuthenticated = true;
//     },
//     clearToken: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },

  
// });

// export const { setToken, clearToken } = authSlice.actions;
// export default authSlice.reducer;



// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
    isAuthenticated: initialToken ? true : false,
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;

      // Validate the token here if needed
      const decodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
        // Token is expired, handle accordingly
        localStorage.removeItem('token');
        state.token = null;
        state.isAuthenticated = false;
      } else {
        // Token is valid
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    clearToken: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

// Selector to check authentication status
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Additional selector to get the token
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
