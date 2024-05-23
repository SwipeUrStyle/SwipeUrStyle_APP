import React, { useState, useEffect } from 'react';
import './user.css';
 import swal from 'sweetalert';
const UserDetails = () => {
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
 
  useEffect(() => {
    const fetchDataData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };
 
        const getResponse = await fetch('https://swipeurstyleback.azurewebsites.net/user', {
          method: 'GET',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });
        const dataUser = await getResponse.json();
        setUserInfo(dataUser);
      } catch (error) {
        swal('Error fetching user data:', error, 'error');
      }
    };
 
    fetchDataData();
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