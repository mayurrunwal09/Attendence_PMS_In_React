
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Home, { UserList, UserTypeList, Leave,AddLeave } from './component/Home'; // Corrected import

import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="usertypelist" element={<UserTypeList />} />
            <Route path="leave" element={<Leave />} />
            <Route path="Applyleave" element={<AddLeave />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;










