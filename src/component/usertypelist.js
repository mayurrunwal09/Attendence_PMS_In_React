import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Grid,
} from '@mui/material';

import {
  fetchUserTypes,
  createUserType,
  updateUserType,
  deleteUserType,
} from '../slices/UserType/usertypeSlice';

function UserTypeList() {
  const dispatch = useDispatch();
  const userTypes = useSelector((state) => state.userTypes.userTypes);
  const status = useSelector((state) => state.userTypes.status);
  const error = useSelector((state) => state.userTypes.error);

  const [userTypeData, setUserTypeData] = useState({
    typeName: '',
    id: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserTypes());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserTypeData({ ...userTypeData, [name]: value });
  };

  const handleInsert = () => {
    dispatch(createUserType(userTypeData));
    clearForm();
  };

  const handleUpdate = () => {
    dispatch(updateUserType(userTypeData));
    clearForm();
  };

  const handleDelete = (id) => {
    dispatch(deleteUserType(id));
  };

  const handleEdit = (userType) => {
    setEditMode(true);
    setEditId(userType.id);
    setUserTypeData({ typeName: userType.typeName, id: userType.id });
  };

  const clearForm = () => {
    setEditMode(false);
    setEditId(null);
    setUserTypeData({ typeName: '', id: 0 });
  };

  if (status === 'loading') {
    return <div>Loading user types...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        User Type List
      </Typography>

      <form style={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Type Name"
                type="text"
                name="typeName"
                value={userTypeData.typeName}
                onChange={handleInputChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={clearForm}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleInsert}>
                Insert
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTypes.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Card>
                    <CardContent>
                      {editMode && editId === user.id ? (
                        <TextField
                          label="Type Name"
                          type="text"
                          name="typeName"
                          value={userTypeData.typeName}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        user.typeName
                      )}
                    </CardContent>
                  </Card>
                </TableCell>
                <TableCell>
                  {editMode && editId === user.id ? (
                    <>
                      <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: '5px' }}>
                        Save
                      </Button>
                      <Button variant="contained" color="secondary" onClick={clearForm}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserTypeList;
