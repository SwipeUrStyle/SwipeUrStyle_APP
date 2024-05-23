import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './options.css';

function CalendaryOptions() {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState('MySchedule');

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