// ConfigurationsUser.js
import React from 'react';
import './user.css';
import UserDetails from './UserDetails';

const ConfigurationsUser = () => {
  return (
    <div>
      <UserDetails />
      <div className="user-grid-container">
        <div className="user-grid-item">Notifications:</div>
        <div className="user-grid-item">Theme:</div>
        <div className="user-grid-item">Language:</div>
      </div>
    </div>
  );
};

export default ConfigurationsUser;
