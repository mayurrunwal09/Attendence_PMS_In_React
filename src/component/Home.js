

// src/component/Home.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logout from '../Logout';
import UserList from './UserList';
import UserTypeList from './UserTypeList';
import Leave from './Leave';
import Report from './Report';
import AddLeave from './InsertLeave/AddLeave'
import ClockInButton from './ClockInButton';
import ClockOutButton from './ClockOutButton';
import StartBreak from './StartBreak';
import EndBreak from './EndBreak';


function Home() {
  return (
    <div>
       

      <nav>
      <ClockInButton />
        <ClockOutButton/>
        <StartBreak/>
        <EndBreak/>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="userlist">User List</Link>
          </li>
          <li>
            <Link to="usertypelist">User Type List</Link>
          </li>
          <li>
            <Link to="leave">Leave List</Link>
          </li>
          <li>
            <Link to="Applyleave">Apply Leave</Link>
          </li>
          <li>
            <Link to="Report">Report</Link>
          </li>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <Outlet />
    
    </div>
  );
}

export default Home;
export { UserList, UserTypeList, Leave,AddLeave,Report };








