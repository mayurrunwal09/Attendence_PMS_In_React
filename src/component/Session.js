import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSessions, postSession } from '../slices/Session/sessionSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const Session = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);
  const status = useSelector((state) => state.session.status);
  const error = useSelector((state) => state.session.error);

  const [newSessionData, setNewSessionData] = useState({
    eventName: '',
    eventType: '',
    eventDateTime: new Date().toISOString(),
    username: '',
    mentorName: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAllSessions());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format the date string for 'eventDateTime'
    let formattedValue = value;
    if (name === 'eventDateTime') {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      formattedValue = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    setNewSessionData({
      ...newSessionData,
      [name]: formattedValue,
    });
  };

  const handlePostSession = () => {
    dispatch(postSession(newSessionData));
    // Close the form after submission
    setIsFormVisible(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Create New Session</h2>
      
      {/* "Add Manual Event" button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
        style={{ marginBottom: '20px' }}
      >
        Add Manual Event
      </Button>

      {/* Form to insert data */}
      {isFormVisible && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <div>
            <TextField
              label="Event Name"
              type="text"
              name="eventName"
              value={newSessionData.eventName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Event Type"
              type="text"
              name="eventType"
              value={newSessionData.eventType}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Event Date and Time"
              type="datetime-local"
              name="eventDateTime"
              value={newSessionData.eventDateTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={newSessionData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Mentor Name"
              type="text"
              name="mentorName"
              value={newSessionData.mentorName}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handlePostSession}>
            Create Session
          </Button>
        </Paper>
      )}

      <h2>Sessions</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Mentor Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.eventName}</TableCell>
                <TableCell>{session.eventType}</TableCell>
                <TableCell>{new Date(session.eventDate).toLocaleString()}</TableCell>
                <TableCell>{session.userId}</TableCell>
                <TableCell>{session.username}</TableCell>
                <TableCell>{session.mentorName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Session;
