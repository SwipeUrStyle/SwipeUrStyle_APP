import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="Header">
      <div className="name-app">
        <p className="name">Swipe Ur Style</p>
        <div className="circle circle-left"></div>
        <div className="circle circle-right"></div>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/Styling">
              <img src={require('../imagenes/styling-icon.jpg')} alt="Styling" />
              <span>Styling</span>
            </Link>
          </li>
          <li>
            <Link to="/schedule">
              <img src={require('../imagenes/schedule-icon.PNG')} alt="Schedule" />
              <span>Schedule</span>
            </Link>
          </li>
          <li>
            <Link to="/closet">
              <img src={require('../imagenes/closet-icon.PNG')} alt="Closet" />
              <span>Closet</span>
            </Link>
          </li>
          <li>
            <Link to="/account">
              <img src={require('../imagenes/account-icon.PNG')} alt="Account" />
              <span>Account</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;