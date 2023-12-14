






// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { ResetPassword } from '../slices/User/userSlice';
// import './Reset.css'; 
// import { Link } from 'react-router-dom';

// const ResetPasswordComponent = () => {
//   const dispatch = useDispatch();

//   const [resetPasswordData, setResetPasswordData] = useState({
//     email: '',
//     newPassword: '',
//   });

//   const handleResetPassword = () => {
//     dispatch(ResetPassword(resetPasswordData));
//   };

//   return (
//     <div className="reset-password-container">
//       <h1>Reset Password</h1>
//       <div className="form-group">
//         <label>Enter Register Email:</label>
//         <input
//           type="text"
//           value={resetPasswordData.email}
//           onChange={(e) => setResetPasswordData({ ...resetPasswordData, email: e.target.value })}
//         />
//       </div>
//       <div className="form-group">
//         <label>New Password:</label>
//         <input
//           type="password"
//           value={resetPasswordData.newPassword}
//           onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
//         />
//       </div>
//       <button className="reset-password-button" onClick={handleResetPassword}>
//         Reset Password
//       </button>
//       <p>
//         Remember your password? <Link to="/login">Back to Login</Link>
//       </p>
     
//     </div>
//   );
// };

// export default ResetPasswordComponent;





import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ResetPassword } from '../slices/User/userSlice';
import './Reset.css';
import { Link } from 'react-router-dom';

const ResetPasswordComponent = () => {
  const dispatch = useDispatch();

  const [resetPasswordData, setResetPasswordData] = useState({
    email: '',
    newPassword: '',
  });

  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      // Dispatch the ResetPassword action
      await dispatch(ResetPassword(resetPasswordData));
      // If successful, set the success message
      setResetSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      {!resetSuccess ? (
        <>
          <div className="form-group">
            <label>Enter Register Email:</label>
            <input
              type="text"
              value={resetPasswordData.email}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={resetPasswordData.newPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
            />
          </div>
          <button className="reset-password-button" onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      ) : (
        <p className="reset-success-message">Password reset successfully!</p>
      )}
      <p>
        Remember your password? <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ResetPasswordComponent;
