import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './options.css';

function CalendaryOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const redireccionar = (ruta) => {
    setActiveButton(ruta);
    navigate(ruta);
  };

  return (
    <div className="CalendaryOptions">
      <button onClick={() => redireccionar('MySchedule')} className={`btn ${activeButton === 'MySchedule' ? 'active' : ''}`}>My Calendar</button>
    </div>
  );
}

export default CalendaryOptions;