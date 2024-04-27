import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './options.css';

function Options() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const redireccionar = (ruta) => {
    setActiveButton(ruta);
    navigate(ruta);
  };

  return (
    <div className="Options">
      <button onClick={() => redireccionar('Swipe ur syle')} className={`btn ${activeButton === 'Swipe ur syle' ? 'active' : ''}`}>Swipe ur syle</button>
      <button onClick={() => redireccionar('inspiration')} className={`btn ${activeButton === 'inspiration' ? 'active' : ''}`}>Inspiration</button>
      <button onClick={() => redireccionar('Ur favorites')} className={`btn ${activeButton === 'Ur favorites' ? 'active' : ''}`}>Ur favorites</button>
    </div>
  );
}

export default Options;