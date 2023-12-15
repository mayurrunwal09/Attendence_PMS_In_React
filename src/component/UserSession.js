// UserSession.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSessions, postSession } from '../slices/Session/sessionSlice';
import { jwtDecode } from 'jwt-decode';

const UserSession = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);
  const status = useSelector((state) => state.session.status);
  const error = useSelector((state) => state.session.error);

  const [newSessionData, setNewSessionData] = useState({
    eventName: '',
    eventType: '',
    eventDateTime: new Date().toISOString(),
    mentorName: '',
  });

  const [userIdInput, setUserIdInput] = useState(''); // State to hold the entered user ID

  useEffect(() => {
    // Fetch user sessions only if a user ID is entered
    if (userIdInput) {
      dispatch(fetchUserSessions(userIdInput));
    }
  }, [dispatch, userIdInput]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSessionData({
      ...newSessionData,
      [name]: value,
    });
  };

  const handlePostSession = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const sessionDataWithUserId = {
      ...newSessionData,
      userId,
    };

    dispatch(postSession(sessionDataWithUserId));
  };

  const handleUserIdChange = (e) => {
    setUserIdInput(e.target.value);
  };

  return (
    <div>
      <h2>Sessions</h2>
      {/* Input field to enter user ID */}
      <label>
        Enter User ID:
        <input type="text" value={userIdInput} onChange={handleUserIdChange} />
      </label>
      <button onClick={() => setUserIdInput('')}>Clear</button>

      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <strong>Event ID:</strong> {session.id} <br />
            <strong>Event Name:</strong> {session.eventName} <br />
            <strong>Event Type:</strong> {session.eventType} <br />
            <strong>Event Date:</strong> {new Date(session.eventDateTime).toLocaleString()} <br />
            <strong>User ID:</strong> {session.userId} <br />
            <strong>User Name:</strong> {session.username} <br />
            <strong>Mentor Name:</strong> {session.mentorName} <br />
            <hr />
          </li>
        ))}
      </ul>

      <div>
      </div>
    </div>
  );
};

export default UserSession;






// // UserSession.js

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserSessions, postSession } from '../slices/Session/sessionSlice';
// import { jwtDecode } from 'jwt-decode';


// const UserSession = () => {
//   const dispatch = useDispatch();
//   const sessions = useSelector((state) => state.session.sessions);
//   const status = useSelector((state) => state.session.status);
//   const error = useSelector((state) => state.session.error);

//   const [newSessionData, setNewSessionData] = useState({
//     eventName: '',
//     eventType: '',
//     eventDateTime: new Date().toISOString(),
//     mentorName: '',
//   });

//   useEffect(() => {
//     // Fetch user sessions when the component is mounted
//     const token = localStorage.getItem('token');
//     const decodedToken = token ? jwtDecode(token) : null;
//     const userId = decodedToken ? decodedToken.userId : null;

//     if (userId) {
//       dispatch(fetchUserSessions(userId));
//       // Declare userId here so it's accessible in the entire component
//       // It was missing in the original code
//       setUserId(userId);
//     }
//   }, [dispatch]);

//   // Declare userId state
//   const [userId, setUserId] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSessionData({
//       ...newSessionData,
//       [name]: value,
//     });
//   };

//   const handlePostSession = () => {
//     const sessionDataWithUserId = {
//       ...newSessionData,
//       userId: userId, // Use the declared userId
//     };

//     dispatch(postSession(sessionDataWithUserId));
//   };

//   return (
//     <div>
//       <h2>Sessions</h2>

//       <ul>
//         {sessions.map((session) => (
//           <li key={session.id}>
//              <strong>Event Id:</strong> {session.id} <br />
            
//             <strong>Event Name:</strong> {session.eventName} <br />
//             <strong>Event Type:</strong> {session.eventType} <br />
//             <strong>Event Date:</strong> {new Date(session.eventDateTime).toLocaleString()} <br />
//             <strong>User ID:</strong> {session.userId} <br />
//             <strong>User Name:</strong> {session.username} <br />
//             <strong>Mentor Name:</strong> {session.mentorName} <br />
//             <hr />
//           </li>
//         ))}
//       </ul>

//       <div>
       
//       </div>
//     </div>
//   );
// };

// export default UserSession;
