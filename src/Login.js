




// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from './slices/authSlice';
// import {
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Container,
// } from '@mui/material';

// const Login = () => {
//   const { handleLogin, isAuthenticated } = useAuth();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLoginClick = async () => {
//     try {
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
//         throw new Error(`Incorrect username or password: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.token) {
//         console.log('JWT Token:', data.token);
//         handleLogin(data.token);
//         dispatch(loginSuccess({ user: data.user, token: data.token }));
//         navigate('/');
//       } else {
//         throw new Error('Token not found in API response');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError(`An error occurred during login: ${error.message}`);
//       dispatch(loginFailure(`An error occurred during login: ${error.message}`));
//     }
//   };

//   if (isAuthenticated) {
//     navigate('/');
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>
//         <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
//         <form>
//           <TextField
//             label="Username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleLoginClick}
//             style={{ marginTop: '20px' }}
//           >
//             Login
//           </Button>
//         </form>
//         <Typography style={{ marginTop: '10px' }}>
//           Don't have an account? <Link to="/register">Register here</Link>.
//         </Typography>
//       </Paper>
//     </Container>
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
  CssBaseline,
  Avatar,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';

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
      <CssBaseline />
      <Paper elevation={3} className="login-container">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MuiLink component={Link} to="/register" variant="body2">
              Don't have an account? Register here
            </MuiLink>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
