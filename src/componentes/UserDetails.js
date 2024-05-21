
import React from 'react';
import './user.css';

const UserDetails = () => {
  return (
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
  );
};

export default UserDetails;
