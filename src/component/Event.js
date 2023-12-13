









// // src/Event.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../slices/Event/eventSlice';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   CircularProgress,
//   Grid,
// } from '@mui/material';

// const Event = () => {
//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events);
//   const status = useSelector((state) => state.events.status);
//   const error = useSelector((state) => state.events.error);

//   const [newEvent, setNewEvent] = useState({ eventName: '', dateOfEvent: '' });
//   const [updateEventFields, setUpdateEventFields] = useState({ id: 0, eventName: '', dateOfEvent: '' });

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleCreateEvent = () => {
//     dispatch(createEvent(newEvent));
//     setNewEvent({ eventName: '', dateOfEvent: '' });
//   };

//   const handleUpdateEvent = () => {
//     dispatch(updateEvent(updateEventFields));
//     setUpdateEventFields({ id: 0, eventName: '', dateOfEvent: '' });
//   };

//   const handleDeleteEvent = (eventId) => {
//     dispatch(deleteEvent(eventId));
//   };

//   if (status === 'loading') {
//     return <CircularProgress />;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <h1>Event List</h1>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
                
//                 <TableCell>Event Name</TableCell>
//                 <TableCell>Date of Holiday</TableCell>
               
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event) => (
//                 <TableRow key={event.id}>
             
//                   <TableCell>{event.eventName}</TableCell>
//                   <TableCell>{new Date(event.dateOfEvent).toLocaleDateString()}</TableCell>
//                   {/* <TableCell>
//                     <Button onClick={() => setUpdateEventFields(event)} variant="outlined" color="primary">
//                       Edit
//                     </Button>
//                     <Button onClick={() => handleDeleteEvent(event.id)} variant="outlined" color="secondary">
//                       Delete
//                     </Button>
//                   </TableCell> */}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <h2>Create Event</h2>
//         <TextField
//           label="Event Name"
//           variant="outlined"
//           fullWidth
//           value={newEvent.eventName}
//           onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
//         />
//         <TextField
//           label="Date of Event"
//           type="date"  // Set type to "date" to show only the date part
//           variant="outlined"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={newEvent.dateOfEvent}
//           onChange={(e) => setNewEvent({ ...newEvent, dateOfEvent: e.target.value })}
//         />
//         <Button onClick={handleCreateEvent} variant="contained" color="primary" style={{ marginTop: '16px' }}>
//           Create
//         </Button>
//       </Grid>

//       {/* <Grid item xs={12} sm={6}>
//         <h2>Update Event</h2>
//         <TextField
//           label="Event Name"
//           variant="outlined"
//           fullWidth
//           value={updateEventFields.eventName}
//           onChange={(e) => setUpdateEventFields({ ...updateEventFields, eventName: e.target.value })}
//         />
//         <TextField
//           label="Date of Event"
//           type="date"  // Set type to "date" to show only the date part
//           variant="outlined"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={updateEventFields.dateOfEvent}
//           onChange={(e) => setUpdateEventFields({ ...updateEventFields, dateOfEvent: e.target.value })}
//         />
//         <Button onClick={handleUpdateEvent} variant="contained" color="primary" style={{ marginTop: '16px' }}>
//           Update
//         </Button>
//       </Grid> */}
//     </Grid>
//   );
// };

// export default Event;




// src/Event.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../slices/Event/eventSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Grid,
} from '@mui/material';

const Event = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  const [newEvent, setNewEvent] = useState({ eventName: '', dateOfEvent: '' });
  const [updateEventFields, setUpdateEventFields] = useState({ id: 0, eventName: '', dateOfEvent: '' });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleCreateEvent = () => {
    dispatch(createEvent(newEvent));
    setNewEvent({ eventName: '', dateOfEvent: '' });
  };

  const handleUpdateEvent = () => {
    dispatch(updateEvent(updateEventFields));
    setUpdateEventFields({ id: 0, eventName: '', dateOfEvent: '' });
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>Holidays List</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Date of Holiday</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{new Date(event.dateOfEvent).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(event.dateOfEvent).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} sm={6}>
        <h2>Create Event</h2>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          value={newEvent.eventName}
          onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
        />
        <TextField
          label="Date of Event"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={newEvent.dateOfEvent}
          onChange={(e) => setNewEvent({ ...newEvent, dateOfEvent: e.target.value })}
        />
        <Button onClick={handleCreateEvent} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Create
        </Button>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <h2>Update Event</h2>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          value={updateEventFields.eventName}
          onChange={(e) => setUpdateEventFields({ ...updateEventFields, eventName: e.target.value })}
        />
        <TextField
          label="Date of Event"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={updateEventFields.dateOfEvent}
          onChange={(e) => setUpdateEventFields({ ...updateEventFields, dateOfEvent: e.target.value })}
        />
        <Button onClick={handleUpdateEvent} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Update
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default Event;
