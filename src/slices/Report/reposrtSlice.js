// // src/slices/Report/reportSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// const initialState = {
//   data: null,
//   status: 'idle',
//   error: null,
// };

// export const fetchDataById = createAsyncThunk('report/fetchDataById', async (id) => {
//   const response = await fetch(`https://localhost:44369/api/Report/DataById/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   const data = await response.json();
//   return data;
// });


// const reportSlice = createSlice({
//   name: 'report',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDataById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDataById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchDataById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default reportSlice.reducer;





// slices/Report/reposrtSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchDataById = createAsyncThunk('report/fetchDataById', async (_, { getState }) => {
  const token = getState().auth.token;
  const userIdFromToken = jwtDecode(token).UserId;

  try {
    const response = await fetch(`https://localhost:44369/api/Report/DataById/${userIdFromToken}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch report data: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Invalid response data');
    }

    return data;
  } catch (error) {
    console.error('Fetch Report Data Error:', error.message);
    throw new Error(`Failed to fetch report data: ${error.message}`);
  }
});

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDataById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reducer: reportReducer } = reportSlice;
