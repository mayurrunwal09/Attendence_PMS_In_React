// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [userModel, setUserModel] = useState({
//     userName: '',
//     password: '',
//     email: '',
//     mobileNo: '',
//     city: '',
//     userTypeId: '',
//     role: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserModel({ ...userModel, [name]: value });
//     setErrors({ ...errors, [name]: '' }); // Clear the error when the user starts typing
//   };

//   const validateForm = () => {
//     let formIsValid = true;
//     const newErrors = {};

//     // Validate each field
//     if (!userModel.userName) {
//       newErrors.userName = 'Username is required';
//       formIsValid = false;
//     }

//     if (!userModel.password) {
//       newErrors.password = 'Password is required';
//       formIsValid = false;
//     }

//     if (!userModel.email) {
//       newErrors.email = 'Email is required';
//       formIsValid = false;
//     }

//     if (!userModel.mobileNo) {
//       newErrors.mobileNo = 'Mobile Number is required';
//       formIsValid = false;
//     }

//     if (!userModel.city) {
//       newErrors.city = 'City is required';
//       formIsValid = false;
//     }
//     if (!userModel.userTypeId) {
//       newErrors.userTypeId = 'UserType is required';
//       formIsValid = false;
//     }
//     if (!userModel.role) {
//       newErrors.role = 'User Role is required';
//       formIsValid = false;
//     }

//     setErrors(newErrors);
//     return formIsValid;
//   };

//   const handleRegister = async () => {
//     try {
//       if (validateForm()) {
//         await axios.post('https://localhost:44369/api/Login/Register', userModel);

//         // Assuming backend responds with a success status
//         setRegistrationSuccess(true);

//         // Redirect or perform any action after successful registration
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {registrationSuccess && <p style={{ color: 'green' }}>Registration done successfully!</p>}
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="userName"
//           value={userModel.userName}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.userName}</span>
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={userModel.password}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.password}</span>
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="text"
//           name="email"
//           value={userModel.email}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.email}</span>
//       </div>
//       <div>
//         <label>Mobile Number:</label>
//         <input
//           type="text"
//           name="mobileNo"
//           value={userModel.mobileNo}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.mobileNo}</span>
//       </div>
//       <div>
//         <label>City:</label>
//         <input
//           type="text"
//           name="city"
//           value={userModel.city}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.city}</span>
//       </div>
//       <div>
//         <label>UserType Id:</label>
//         <input
//           type="text"
//           name="userTypeId"
//           value={userModel.userTypeId}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.userTypeId}</span>
//       </div>
//       <div>
//         <label>User Role:</label>
//         <input
//           type="text"
//           name="role"
//           value={userModel.role}
//           onChange={handleInputChange}
//         />
//         <span style={{ color: 'red' }}>{errors.role}</span>
//       </div>
//       {/* Add more input fields with validation as needed... */}
//       <button onClick={handleRegister}>Register</button>
//       <p>
//         Already Login? <Link to="/login">Login here</Link>.
//       </p>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
} from '@mui/material';

const Register = () => {
  const [userModel, setUserModel] = useState({
    userName: '',
    password: '',
    email: '',
    mobileNo: '',
    city: '',
    userTypeId: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserModel({ ...userModel, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when the user starts typing
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate each field
    if (!userModel.userName) {
      newErrors.userName = 'Username is required';
      formIsValid = false;
    }

    if (!userModel.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    if (!userModel.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    }

    if (!userModel.mobileNo) {
      newErrors.mobileNo = 'Mobile Number is required';
      formIsValid = false;
    }

    if (!userModel.city) {
      newErrors.city = 'City is required';
      formIsValid = false;
    }
    if (!userModel.userTypeId) {
      newErrors.userTypeId = 'UserType is required';
      formIsValid = false;
    }
    if (!userModel.role) {
      newErrors.role = 'User Role is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleRegister = async () => {
    try {
      if (validateForm()) {
        await axios.post('https://localhost:44369/api/Login/Register', userModel);

        // Assuming backend responds with a success status
        setRegistrationSuccess(true);

        // Redirect or perform any action after successful registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Registration Form
        </Typography>
        {registrationSuccess && <Typography style={{ color: 'green' }}>Registration done successfully!</Typography>}
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="userName"
                value={userModel.userName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.userName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={userModel.password}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.password}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={userModel.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                name="mobileNo"
                value={userModel.mobileNo}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.mobileNo}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                value={userModel.city}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.city}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="UserType Id"
                name="userTypeId"
                value={userModel.userTypeId}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.userTypeId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="User Role"
                name="role"
                value={userModel.role}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <Typography variant="body2" style={{ color: 'red' }}>{errors.role}</Typography>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            style={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
        <Typography style={{ marginTop: '10px' }}>
          Already have an account? <Link to="/login">Login here</Link>.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
