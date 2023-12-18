

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSessions } from '../slices/Session/sessionSlice';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { jwtDecode } from 'jwt-decode';

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px 0',
});

const UserSession = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);
  const status = useSelector((state) => state.session.status);
  const error = useSelector((state) => state.session.error);

  useEffect(() => {
    // Fetch user sessions automatically when the component mounts
    dispatch(fetchUserSessions());
  }, [dispatch]);

  return (
    <Box>
     

      <StyledPaper elevation={3}>
        <Typography variant="h3" gutterBottom>
          Events
        </Typography>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Typography color="error">Error: {error}</Typography>}
        {status === 'succeeded' && (
          <ul>
            {sessions.map((session) => (
              <StyledPaper key={session.id} elevation={1} sx={{ padding: '10px', margin: '10px 0' }}>
                {/* <Typography variant="h5">Event ID: {session.id}</Typography> */}
                <Typography>Event Name: {session.eventName}</Typography>
                <Typography>Event Type: {session.eventType}</Typography>
                <Typography>
                  Event Date: {new Date(session.eventDate).toLocaleString()}
                </Typography>
              
                <Typography>User Name: {session.username}</Typography>
                <Typography>Mentor Name: {session.mentorName}</Typography>
              </StyledPaper>
            ))}
          </ul>
        )}
      </StyledPaper>
    </Box>
  );
};

export default UserSession;


