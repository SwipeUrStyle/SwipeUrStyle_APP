// UserInfoGrid.js
import React from 'react';
import './user.css';
import UserDetails from './UserDetails';

const UserInfoGrid = () => {
  return (
    <div>
      <UserDetails />
      <div className="user-grid-container">
        <div className="user-grid-item">Username:</div>
        <div className="user-grid-item">Email:</div>
        <div className="user-grid-item">Privacy:</div>
        <div className="user-grid-item">Password:</div>
        <div className="user-grid-item">Delete Account</div>
      </div>
    </div>
  );
};

export default UserInfoGrid;
