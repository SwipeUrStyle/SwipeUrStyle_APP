import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './options.css';

function AcountOptions() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Account');

  const redireccionar = (ruta) => {
    setActiveButton(ruta);
    navigate(ruta);
  };

  return (
    <div className="Options">
      <button onClick={() => redireccionar('Account')} className={`btn ${activeButton === 'Account' ? 'active' : ''}`}>Account</button>
      <button onClick={() => redireccionar('Configurations')} className={`btn ${activeButton === 'Configurations' ? 'active' : ''}`}>Configurations</button>
    </div>
  );
}

export default AcountOptions;