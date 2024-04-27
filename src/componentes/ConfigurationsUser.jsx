import React from 'react';
import './user.css';

const ConfigurationsUser = () => {
    return (
        <div className="user-grid-container">
          <div className="user-info">
            <div className="user-avatar">
              <img src={require('../imagenes/avatar.PNG')} alt="Avatar" />
            </div>
            <div className="user-details">
              <p className="user-name">Jorge Ulises</p>
              <p className="user-username">juuseche</p>
              <p className="user-pronouns">He/Him</p>
            </div>
            <button className="update-button">Update</button>
          </div>
          <div className="user-grid-item">Notifications:</div>
          <div className="user-grid-item">Theme:</div>
          <div className="user-grid-item">Language:</div>
      
        </div>
      );
};

export default ConfigurationsUser;