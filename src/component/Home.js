

// // src/component/Home.js
// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import Logout from '../Logout';
// import UserList from './UserList';
// import UserTypeList from './UserTypeList';
// import Leave from './Leave';
// import Report from './Report';
// import AddLeave from './InsertLeave/AddLeave'
// import ClockInButton from './ClockInButton';

// import StartBreak from './StartBreak';



// function Home() {
//   return (
//     <div>
       

//       <nav>
//       <ClockInButton />
//     <br></br>
//         <StartBreak/>
      
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="userlist">User List</Link>
//           </li>
//           <li>
//             <Link to="usertypelist">User Type List</Link>
//           </li>
//           <li>
//             <Link to="leave">Leave List</Link>
//           </li>
//           <li>
//             <Link to="Applyleave">Apply Leave</Link>
//           </li>
//           <li>
//             <Link to="Report">Report</Link>
//           </li>

//           <li>
//             <Logout />
//           </li>
//         </ul>
//       </nav>
//       <Outlet />

//     </div>
//   );
// }

// export default Home;
// export { UserList, UserTypeList, Leave,AddLeave,Report };









// // src/component/Home.js
// import React from 'react';
// import { Link, Outlet, Route, Routes } from 'react-router-dom';
// import Logout from '../Logout';
// import UserList from './UserList';
// import UserTypeList from './UserTypeList';
// import Leave from './Leave';
// import Report from './Report';
// import AddLeave from './InsertLeave/AddLeave';
// import ClockInButton from './ClockInButton';
// import StartBreak from './StartBreak';

// function Home() {
//   return (
//     <div>
//       <nav>
//         <ClockInButton />
//         <br />
//         <StartBreak />

//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/userlist">User List</Link>
//           </li>
//           <li>
//             <Link to="/usertypelist">User Type List</Link>
//           </li>
//           <li>
//             <Link to="/leave">Leave List</Link>
//           </li>
//           <li>
//             <Link to="/Applyleave">Apply Leave</Link>
//           </li>
//           <li>
//             <Link to="/Report">Report</Link>
//           </li>
//           <li>
//             <Logout />
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/userlist" element={<UserList />} />
//         <Route path="/usertypelist" element={<UserTypeList />} />
//         <Route path="/leave" element={<Leave />} />
//         <Route path="/Applyleave" element={<AddLeave />} />
//         <Route path="/Report" element={<Report />} />
//       </Routes>

//       <Outlet />
//     </div>
//   );
// }

// export default Home;
// export { UserList, UserTypeList, Leave, AddLeave, Report };



// src/component/Home.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logout from '../Logout';
import UserList from './UserList';
import UserTypeList from './UserTypeList';
import Leave from './Leave';
import Report from './Report';
import AddLeave from './InsertLeave/AddLeave';
import ClockInButton from './ClockInButton';
import StartBreak from './StartBreak';

function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/userlist">
            User List
          </Button>
          <Button color="inherit" component={Link} to="/usertypelist">
            User Type List
          </Button>
          <Button color="inherit" component={Link} to="/leave">
            Leave List
          </Button>
          <Button color="inherit" component={Link} to="/Applyleave">
            Apply Leave
          </Button>
          <Button color="inherit" component={Link} to="/Report">
            Report
          </Button>
          <Logout />
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '64px' }}>
        <ClockInButton />
        <br />
        <StartBreak />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
export { UserList, UserTypeList, Leave, AddLeave, Report };
