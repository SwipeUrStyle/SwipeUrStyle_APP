import React from 'react';
import './user.css';
import UserDetails from './UserDetails';
 
const ConfigurationsUser = () => {
  return (
    <div>
      <UserDetails />
      <div className="user-grid-container">
        <div className="user-grid-item">Notifications: Disabled</div>
        <div className="user-grid-item">Theme: Light </div>
        <div className="user-grid-item">Language: English</div>
      </div>
    </div>
  );
};
 
export default ConfigurationsUser;