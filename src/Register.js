// Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userModel, setUserModel] = useState({
    userName: '',
    password: '',
    email: '',
    mobileNo: '',
    city: '',
    userTypeId: 1, // Assuming HR role has userTypeId 1
    role: 'HR', // Assuming HR role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserModel({ ...userModel, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('https://localhost:44369/api/Login/Register', userModel);
      // Redirect or perform any action after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input type="text" name="userName" onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" onChange={handleInputChange} />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input type="text" name="mobileNo" onChange={handleInputChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" onChange={handleInputChange} />
      </div>
      <div>
        <label>userTypeId:</label>
        <input type="text" name="userTypeId" onChange={handleInputChange} />
      </div>
      <div>
        <label>role:</label>
        <input type="text" name="role" onChange={handleInputChange} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;



