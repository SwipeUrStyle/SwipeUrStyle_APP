import React, { useState, useEffect } from 'react';
import './user.css';
 import swal from 'sweetalert';
const UserDetails = () => {
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };
 
        const response = await fetch('https://swipeurstyleback.azurewebsites.net/user', {
          method: 'GET',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });
        const userData = await response.json();
        console.log('User data:', userData);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 
    fetchUserData();
  }, []);
 
  const ContruccionFuncion = () => {
    swal('In construction', '', 'warning');
  }
  return (
    <div className="user-info">
      <div className="user-details-container">
        <div className="user-details">
 
          {userInfo && (
            <>
              <div className="user-avatar">
                <img src={require('../imagenes/avatar.PNG')} alt="Avatar" />
              </div>
              <p className="user-name">{userInfo.name}</p>
              <p className="user-username">{userInfo?.username}</p>
              <p className="user-pronouns">{userInfo.gender}</p>
              <button className="update-button" onClick={ContruccionFuncion}>Update</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default UserDetails;