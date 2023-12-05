



// // Login.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://localhost:44369/api/Login/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           UserName: username,
//           Password: password,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Invalid credentials');
//       }
  
//       const data = await response.json();
//       console.log('API Response:', data);
  
//       // Check if the response contains the token
//       if (data.token) {
//         const token = data.token;
//         console.log('JWT Token:', token);
//         localStorage.setItem('token', token);
//         // Redirect or perform any action after successful login
//       } else {
//         throw new Error('Token not found in API response');
//       }
//     } catch (error) {
//       console.error('Login failed:', error.message);
//     }
//   };
  
//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password :</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Login
//         </button>
//       </form>
//       <div>
//         <p>
//           Don't have an account? <Link to="/register">Register here</Link>.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;












import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from './slices/authSlice';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:44369/api/Login/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: username,
          Password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Check if the response contains the token
      if (data.token) {
        const token = data.token;
        console.log('JWT Token:', token);

        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
          throw new Error('Token has expired');
        }

        localStorage.setItem('token', token);
        dispatch(setToken(token));

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        throw new Error('Token not found in API response');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;








