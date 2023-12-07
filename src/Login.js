
// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './slices/authSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const { handleLogin, isAuthenticated } = useAuth(); // Use handleLogin and isAuthenticated from useAuth
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLoginClick = async () => {
    try {
      // Validation for required fields
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
        throw new Error(`Enter Correct username and password: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.token) {
        // Display the token in the console
        console.log('JWT Token:', data.token);

        // Perform other actions with the token if needed

        // Update Redux store and navigate after successful login
        handleLogin(data.token);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate('/'); // Redirect to home after successful login
      } else {
        throw new Error('Token not found in API response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(`An error occurred during login: ${error.message}`);
      dispatch(loginFailure(`An error occurred during login: ${error.message}`));
    }
  };

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div>
      <h2>Login</h2>
      <div style={{ color: 'red' }}>{error}</div>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter UserName'
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required 
          />
        </label>
        <br />
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;





