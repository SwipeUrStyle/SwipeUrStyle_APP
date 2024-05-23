import React, { useState, useEffect } from 'react';
import './user.css';
import UserDetails from './UserDetails';
import swal from 'sweetalert';
const UserInfoGrid = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [show, setShow] = useState(false); // Estado para controlar si se muestra la contraseña

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

  // Función para mostrar la contraseña al presionar el botón
  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const enContruccion = () => {
    swal('In construction', '', 'warning');
  }
  return (
    <div>
      <UserDetails />
      <div className="user-grid-container">
        <div className="user-grid-item">Username: {userInfo?.username}</div>
        <div className="user-grid-item">Email: {userInfo?.email}</div>
        <div className="user-grid-item">Privacy: Private </div>
        <div className="user-grid-item">
          Password: {show ? userInfo?.password : '******'}

          <button className="view-button" onClick={togglePasswordVisibility}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        <button className="gray-button" onClick={enContruccion}>Delete Account</button>
      </div>
    </div>
  );
};

export default UserInfoGrid;