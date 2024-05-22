import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendary.css';


function Calendary() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar onChange={setValue} value={value} locale="en-US" />
    </div>
  );
}

export default Calendary;