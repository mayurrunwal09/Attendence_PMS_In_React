
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Home, { UserList, UserTypeList, Leave,AddLeave,Report, Attendence, UserReport, UserReport1,Event, Session, UserSession, ManualRequestList, InsertRequest, ManualRequest} from './component/Home'; // Corrected import

import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from './component/userProfile';
import Logout from './Logout';
import ResetPasswordComponent from './component/ResetPasswordComponent';



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPasswordComponent />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="usertypelist" element={<UserTypeList />} />
            <Route path="leave" element={<Leave />} />
            <Route path="Applyleave" element={<AddLeave />} />
            <Route path="Report" element={<Attendence />} />
            <Route path="UserReport" element={<UserReport />} />
            <Route path="UserProfile" element={<UserProfile />} />
            <Route path="UserReport1" element={<UserReport1 />} />
            <Route path="Event" element={<Event />} />
            <Route path="logout" element={<Logout />} />
            <Route path="Sessions" element={<Session />} />
            <Route path="UserSessions" element={<UserSession />} />
            <Route path="ManualRequest" element={<ManualRequestList />} />
            <Route path="InsertRequest" element={<ManualRequest />} />

          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;















