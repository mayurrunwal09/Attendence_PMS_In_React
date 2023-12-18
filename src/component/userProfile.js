
// userProfile.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserTypeById, updateUser } from '../slices/User/userSlice';
import { jwtDecode } from 'jwt-decode';
import { Button, TableContainer, Paper, Table, TableBody, TableRow, TableCell, TextField } from '@mui/material';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const userIdFromToken = jwtDecode(localStorage.getItem('token')).UserId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(fetchUserTypeById(userIdFromToken));
        const data = action.payload;
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching user break duration data:', error.message);
      }
    };

    fetchData();
  }, [dispatch, userIdFromToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Dispatch the updateUser action with the edited data
      await dispatch(updateUser({
        id: userIdFromToken,
        userName: fetchedData.userName,
        mobileNo: fetchedData.mobileNo,
        city: fetchedData.city,
        email: fetchedData.email,
        password: fetchedData.password,
        userTypeId: fetchedData.userTypeId,
        role: fetchedData.role,
        typeName: fetchedData.typeName,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFetchedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      {fetchedData && (
        <div>
          <h2>User Profile</h2>
          
          {isEditing ? (
            <Button onClick={handleSaveClick} variant="contained" color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleEditClick} variant="contained" color="primary">
              Edit Profile
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{fetchedData.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.userName}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Mobile No</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.mobileNo}
                        onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.mobileNo}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>City</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.city}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.email}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.password}</TableCell>
                  )}
                </TableRow>
                {/* <TableRow>
                  <TableCell>User Type ID</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.userTypeId}
                        onChange={(e) => handleInputChange('userTypeId', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.userTypeId}</TableCell>
                  )}
                </TableRow> */}
                <TableRow>
                  <TableCell>Role</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.role}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>User Type Name</TableCell>
                  {isEditing ? (
                    <TableCell>
                      <TextField
                        value={fetchedData.typeName}
                        onChange={(e) => handleInputChange('typeName', e.target.value)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{fetchedData.typeName}</TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      )}
    </div>
  );
};

export default UserProfile;







