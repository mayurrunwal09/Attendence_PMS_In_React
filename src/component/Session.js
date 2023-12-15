// // Session.js

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllSessions,postSession } from '../slices/Session/sessionSlice';

// const Session = () => {
//   const dispatch = useDispatch();
//   const sessions = useSelector((state) => state.session.sessions);
//   const status = useSelector((state) => state.session.status);
//   const error = useSelector((state) => state.session.error);

//   const [newSessionData, setNewSessionData] = useState({
//     eventName: '',
//     eventType: '',
//     eventDateTime: new Date().toISOString(),
//     username: '',
//     mentorName: '',
//   });

//   useEffect(() => {
//     dispatch(fetchAllSessions());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSessionData({
//       ...newSessionData,
//       [name]: value,
//     });
//   };

//   const handlePostSession = () => {
//     dispatch(postSession(newSessionData));
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//          <h2>Create New Session</h2>
//       <div>
//         <label>Event Name:</label>
//         <input type="text" name="eventName" value={newSessionData.eventName} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Event Type:</label>
//         <input type="text" name="eventType" value={newSessionData.eventType} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Event Date and Time:</label>
//         <input type="datetime-local" name="eventDateTime" value={newSessionData.eventDateTime} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Username:</label>
//         <input type="text" name="username" value={newSessionData.username} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Mentor Name:</label>
//         <input type="text" name="mentorName" value={newSessionData.mentorName} onChange={handleInputChange} />
//       </div>
//       <button onClick={handlePostSession}>Create Session</button>
//       <h2>Sessions</h2>
//       <ul>
//         {sessions.map((session) => (
//           <li key={session.id}>
//             <strong>Event Name:</strong> {session.eventName} <br />
//             <strong>Event Type:</strong> {session.eventType} <br />
//             <strong>Event Date:</strong> {new Date(session.eventDateTime).toLocaleString()} <br />
//             <strong>User ID:</strong> {session.userId} <br />
//             <strong>Username:</strong> {session.username} <br />
//             <strong>Mentor Name:</strong> {session.mentorName} <br />
//             <hr />
//           </li>
//         ))}
//       </ul>

     
//     </div>
//   );
// };

// export default Session;


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

  useEffect(() => {
    dispatch(fetchAllSessions());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSessionData({
      ...newSessionData,
      [name]: value,
    });
  };

  const handlePostSession = () => {
    dispatch(postSession(newSessionData));
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
      <Button variant="contained" onClick={handlePostSession}>
        Create Session
      </Button>

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
                <TableCell>{new Date(session.eventDateTime).toLocaleString()}</TableCell>
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
