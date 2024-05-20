import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendary.css';

function Calendary() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar-container"> {/* Utiliza la clase calendar-container */}
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default Calendary;