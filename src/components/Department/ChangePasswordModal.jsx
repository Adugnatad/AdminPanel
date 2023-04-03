import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '4px',
    backgroundColor: '#fff',
    maxWidth: '400px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 173, 239, 0.5)',
  },
};

const ChangePasswordModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword.length >= 8) {
    if (newPassword === confirmPassword) {
        onSubmit(newPassword);
      } else {
        toast.error("New password and confirm password do not match!", {
            position: toast.POSITION.TOP_RIGHT,
          });
      }
    }else {
        toast.error("Password must be at-least 8 characters long!", {
            position: toast.POSITION.TOP_RIGHT,
          });
    }
  };

  return (
    <>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Password Modal"
      shouldCloseOnOverlayClick={true}
      style={modalStyles}
    >
      <h2 style={{ color: '#00ADEF' }}>Change Password</h2>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
        {/* <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="current-password">Current Password</label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </div> */}
        <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#00ADEF', color: '#fff', marginTop: "15px" }}>Save Changes</button>
      </form>
    </Modal>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </>
  );
};

export default ChangePasswordModal;
