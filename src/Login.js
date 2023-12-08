
// // Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Import useAuth
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from './slices/authSlice';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const { handleLogin, isAuthenticated } = useAuth(); // Use handleLogin and isAuthenticated from useAuth
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLoginClick = async () => {
//     try {
//       // Validation for required fields
//       if (!username || !password) {
//         throw new Error('Username and Password are required.');
//       }

//       const response = await fetch('https://localhost:44369/api/Login/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error(`Enter Correct username and password: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.token) {
//         // Display the token in the console
//         console.log('JWT Token:', data.token);

//         // Perform other actions with the token if needed

//         // Update Redux store and navigate after successful login
//         handleLogin(data.token);
//         dispatch(loginSuccess({ user: data.user, token: data.token }));
//         navigate('/'); // Redirect to home after successful login
//       } else {
//         throw new Error('Token not found in API response');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError(`An error occurred during login: ${error.message}`);
//       dispatch(loginFailure(`An error occurred during login: ${error.message}`));
//     }
//   };

//   // Redirect to home if already authenticated
//   if (isAuthenticated) {
//     navigate('/');
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <div style={{ color: 'red' }}>{error}</div>
//       <form>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder='Enter UserName'
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Enter Password'
//             required 
//           />
//         </label>
//         <br />
//         <button type="button" onClick={handleLoginClick}>
//           Login
//         </button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/register">Register here</Link>.
//       </p>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './slices/authSlice';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from '@mui/material';

const Login = () => {
  const { handleLogin, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLoginClick = async () => {
    try {
      if (!username || !password) {
        throw new Error('Username and Password are required.');
      }

      const response = await fetch('https://localhost:44369/api/Login/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Incorrect username or password: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.token) {
        console.log('JWT Token:', data.token);
        handleLogin(data.token);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate('/');
      } else {
        throw new Error('Token not found in API response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(`An error occurred during login: ${error.message}`);
      dispatch(loginFailure(`An error occurred during login: ${error.message}`));
    }
  };

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
        <form>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
        <Typography style={{ marginTop: '10px' }}>
          Don't have an account? <Link to="/register">Register here</Link>.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;




