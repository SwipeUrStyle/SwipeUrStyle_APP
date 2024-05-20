import React from 'react';
import './user.css';

const UserInfoGrid = () => {
  return (
    <div>
      <div className="user-info">
      
        <div className="user-details-container">
          <div className="user-details">
          <div className="user-avatar">
          <img src={require('../imagenes/avatar.PNG')} alt="Avatar" />
        </div>
            <p className="user-name">Jorge Ulises</p>
            <p className="user-username">juuseche</p>
            <p className="user-pronouns">He/Him</p>
            <button className="update-button">Update</button>
          </div>
        </div>
      </div>
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