import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

import { fetchUsers, updateUser, deleteUser } from '../slices/User/userSlice';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    userName: '',
    mobileNo: '',
    city: '',
    email: '',
    password: '',
    userTypeId: 0,
    role: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUserData({ ...user });
  };

  const handleSaveEdit = () => {
    dispatch(updateUser({ ...editedUserData }));
    setEditingUserId(null);
  };

  const handleDeleteClick = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      dispatch(deleteUser(userId));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>UserType Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.userName}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, userName: e.target.value })
                      }
                    />
                  ) : (
                    user.userName
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.mobileNo}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, mobileNo: e.target.value })
                      }
                    />
                  ) : (
                    user.mobileNo
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.city}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, city: e.target.value })
                      }
                    />
                  ) : (
                    user.city
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.email}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="password"
                      value={editedUserData.password}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, password: e.target.value })
                      }
                    />
                  ) : (
                    user.password
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.typeName}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, typeName: e.target.value })
                      }
                    />
                  ) : (
                    user.typeName
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField
                      type="text"
                      value={editedUserData.role}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, role: e.target.value })
                      }
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => handleEditClick(user)}>Edit</Button>
                      <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
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

export default UserList;
