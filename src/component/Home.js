// Home.js

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div>
      <nav>
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
          <ul>
            <Link to="register"></Link>
          </ul>
          <li>
            <Link to="leave">Leave List</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Home;
