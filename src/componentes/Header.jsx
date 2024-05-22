import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import swal from 'sweetalert';

function Header() {

  const handleLogOutClick = (event) => {
    event.preventDefault(); // Prevenir la navegación automática
    swal({
      title: "Are you sure?",
      text: "You will log out of our amazing app!",
      icon: "warning",
      buttons: ["Cancel", "Yes, take me out!"],
      dangerMode: true,
    }).then((willLogOut) => {
      if (willLogOut) {
        swal("We see you next time!", "Thank you for the visit.", "success").then(() => {
          // Aquí puedes agregar cualquier lógica adicional antes de redirigir
          window.location.href = '/'; // Redirigir manualmente
        });
      } else {
        swal("Action Cancelled", "You are still logged in!", "info");
      }
    });
  };

  return (
    <header className="Header">
      <div className="name-app">
        <p className="name">Swipe Ur Style</p>
        <div className="circle circle-left"></div>
        <div className="circle circle-right circle-right-1"></div>
        <div className="circle circle-right circle-right-2"></div>
        <div className="circle circle-right circle-right-3"></div>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/Styling/Swipe ur syle">
              <img src={require('../imagenes/styling-icon.jpg')} alt="Styling" />
              <span>Styling</span>
            </Link>
          </li>
          <li>
            <Link to="/schedule/MySchedule">
              <img src={require('../imagenes/schedule-icon.PNG')} alt="Schedule" />
              <span>Schedule</span>
            </Link>
          </li>
          <li>
            <Link to="/closet/My Closet">
              <img src={require('../imagenes/closet-icon.PNG')} alt="Closet" />
              <span>Closet</span>
            </Link>
          </li>
          <li>
            <Link to="/account/Account">
              <img src={require('../imagenes/account-icon.PNG')} alt="Account" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogOutClick}>
              <img src={require('../imagenes/LogOut.png')} alt="LogOut" />
              <span>LogOut</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
