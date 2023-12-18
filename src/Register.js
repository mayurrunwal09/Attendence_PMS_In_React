

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,MenuItem,Select,InputLabel,FormControl
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
     
        if (userModel.userTypeId === '1' || userModel.userTypeId === '2') {
          const response = await axios.post('https://localhost:44369/api/Login/Register', userModel);
  
          if (response.data.success) {
            setRegistrationSuccess(true);
            
          } else {
        
            if (response.data.errors) {
           
              setErrors({
                ...errors,
                ...response.data.errors.reduce((acc, error) => {
                  acc[error.split(':')[0].toLowerCase()] = error.split(':')[1].trim();
                  return acc;
                }, {})
              });
            } else if (response.data.message) {
           
              setErrors({
                ...errors,
                userName: response.data.message
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Registration failed:May be same Username exists', error);
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>User Type</InputLabel>
                <Select
                  label="User Type"
                  name="userTypeId"
                  value={userModel.userTypeId}
                  onChange={handleInputChange}
                >
                  <MenuItem value="1">Admin</MenuItem>
                  <MenuItem value="2">Employee</MenuItem>
                </Select>
                <Typography variant="body2" style={{ color: 'red' }}>{errors.userTypeId}</Typography>
              </FormControl>
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
