
// // src/component/UserType.js

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// //import { fetchUserTypes, createUserType, updateUserType, deleteUserType } from '../slices/usertypeSlice';
// import { fetchUserTypes,createUserType,updateUserType,deleteUserType } from '../slices/UserType/usertypeSlice';
// function UserTypeList() {
//   const dispatch = useDispatch();
//   const userTypes = useSelector((state) => state.userTypes.userTypes);
//   const status = useSelector((state) => state.userTypes.status);
//   const error = useSelector((state) => state.userTypes.error);

//   // State for user type input fields
//   const [userTypeData, setUserTypeData] = useState({
//     typeName: '',
//     id: 0,
//   });

//   useEffect(() => {
//     // Dispatch the async thunk when the component mounts
//     dispatch(fetchUserTypes());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserTypeData({ ...userTypeData, [name]: value });
//   };

//   const handleInsert = () => {
//     // Dispatch the async thunk to insert user type
//     dispatch(createUserType(userTypeData));
//   };

//   const handleUpdate = () => {
//     // Dispatch the async thunk to update user type
//     dispatch(updateUserType(userTypeData));
//   };

//   const handleDelete = () => {
//     // Dispatch the async thunk to delete user type
//     dispatch(deleteUserType(userTypeData.id));
//   };

//   if (status === 'loading') {
//     return <div>Loading user types...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
     
//       <h2>Insert User Type</h2>
//       <form>
//         <label>Type Name:</label>
//         <input type="text" name="typeName" value={userTypeData.typeName} onChange={handleInputChange} />
//         <button type="button" onClick={handleInsert}>
//           Insert User Type
//         </button>
//       </form>

//       <h2>Update/Delete User Type</h2>
//       <form>
//         <label>Type Name:</label>
//         <input type="text" name="typeName" value={userTypeData.typeName} onChange={handleInputChange} />
//         <label>ID:</label>
//         <input type="number" name="id" value={userTypeData.id} onChange={handleInputChange} />
//         <button type="button" onClick={handleUpdate}>
//           Update User Type
//         </button>
//         <button type="button" onClick={handleDelete}>
//           Delete User Type
//         </button>
//       </form>
//       <h2>User List</h2>
    
//     <table>
//       <thead>
//         <tr>
//         <th> ID</th>
//           <th>Type Name</th>
                
         
//         </tr>
//       </thead>
//       <tbody>
//         {userTypes.map((users) => (
//           <tr key={users.id}>
//              <td>{users.id}</td>
//             <td>{users.typeName}</td>
          
       
//             <td>
            
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>
//   );
// }

// export default UserTypeList;








import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
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
        <TextField
          label="Type Name"
          type="text"
          name="typeName"
          value={userTypeData.typeName}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        {editMode ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginLeft: '10px' }}>
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={clearForm} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleInsert} style={{ marginLeft: '10px' }}>
            Insert
          </Button>
        )}
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
