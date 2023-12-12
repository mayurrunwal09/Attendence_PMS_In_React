




  // src/component/Home.js
  import React, { useEffect, useState } from 'react';
  import { Link, Outlet } from 'react-router-dom';
  import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    TableContainer,Paper,Table,TableBody,TableRow,TableCell
  } from '@mui/material';
  import Logout from '../Logout';
  import UserList from './UserList';
  import UserTypeList from './UserTypeList';
  import Leave from './Leave';
  import UserReport from './UserReport';
  import AddLeave from './InsertLeave/AddLeave';
  import ClockInButton from './ClockInButton';
  import StartBreak from './StartBreak';
  import HomeIcon from '@mui/icons-material/Home';
  import GroupIcon from '@mui/icons-material/Group';
  import WorkIcon from '@mui/icons-material/Work';
  import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Placeholder for LeaveIcon
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchUserTypeById } from '../slices/User/userSlice';
  import { jwtDecode } from 'jwt-decode';
  // Import MenuIcon from Material-UI icons library
  import MenuIcon from '@mui/icons-material/Menu';
  import UserProfile from './userProfile';
  import Attendence from './Attendence';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';

  function Home() {
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const handleDrawerOpen = () => {
      setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };
    const userIdFromToken = jwtDecode(localStorage.getItem('token')).UserId;
    const handleButtonClick = async () => {
      try {
        // Dispatch the fetchUserTypeById action with the userIdFromToken
        const data = await dispatch(fetchUserTypeById(userIdFromToken));
        setFetchedData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching user type data:', error.message);
      }
    };
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
    
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <List>
            <ListItem button component={Link} to="/">
              <HomeIcon />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/userlist">
              <GroupIcon />
              <ListItemText primary="User List" />
            </ListItem>
            <ListItem button component={Link} to="/usertypelist">
              <WorkIcon />
              <ListItemText primary="User Type List" />
            </ListItem>
            <ListItem button component={Link} to="/leave">
              {/* Placeholder for LeaveIcon */}
              <InsertDriveFileIcon />
              <ListItemText primary="Leave List" />
            </ListItem>
            <ListItem button component={Link} to="/Applyleave">
              <InsertDriveFileIcon />
              <ListItemText primary="Apply Leave" />
            </ListItem>
            <ListItem button component={Link} to="/Report">
              <InsertDriveFileIcon />
              <ListItemText primary="Attendence" />
            </ListItem>
            <ListItem button component={Link} to="/UserReport">
              <InsertDriveFileIcon />
              <ListItemText primary="Report" />
            </ListItem>
          
            <Logout/>
          </List>
        </Drawer>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: '2' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Your App Name
            </Typography>
            <ClockInButton />
            <br />
            <StartBreak />
              
            <IconButton
              component={Link}
              to="/UserProfile"
              color="inherit"
              sx={{ marginLeft: '2' }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: '64px' }}>
          <h2>Welcome to PMS</h2>
          <Outlet />
        </div>
      </div>
    </div>
    );
  }

  export default Home;
  export { UserList, UserTypeList, Leave, AddLeave, Attendence,UserReport };








