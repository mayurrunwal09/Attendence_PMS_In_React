



// // App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Login';

// import UserList from './component/UserList';

// import Register from './Register';
// import UserTypeList from './component/usertypelist';
// import Home from './component/Home';
// import Leave from './component/Leave';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />}>
//           <Route index element={<Login />} />
//           <Route path="userlist" element={<UserList />} />
//           <Route path="usertypelist" element={<UserTypeList />} />
//           <Route path="register" element={<Register />} />
//           <Route path="leave" element={<Leave />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import UserList from './component/UserList';
import Register from './Register';
import UserTypeList from './component/usertypelist';
import Home from './component/Home';
import Leave from './component/Leave';
import { selectIsAuthenticated } from './slices/authSlice';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        >
          <Route index element={<Login />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="usertypelist" element={<UserTypeList />} />
          <Route path="register" element={<Register />} />
          <Route path="leave" element={<Leave />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
