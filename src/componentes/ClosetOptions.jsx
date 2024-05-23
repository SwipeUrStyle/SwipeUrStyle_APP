import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './options.css';

function ClosetOptions() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('My Closet');
  const redireccionar = (ruta) => {
    setActiveButton(ruta);
    navigate(ruta);
  };

  return (
    <div className="Options">
      <button onClick={() => redireccionar('My Closet')} className={`btn ${activeButton === 'My Closet' ? 'active' : ''}`}>My Closet</button>
      <button onClick={() => redireccionar('Paper Bin')} className={`btn ${activeButton === 'Paper Bin' ? 'active' : ''}`}>Paper Bin</button>
    </div>
  );
}

export default ClosetOptions;