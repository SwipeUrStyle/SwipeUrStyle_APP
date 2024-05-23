import React, { useState, useEffect } from 'react';
import './clothingselector.css';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ClothingSelector = () => {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [topsData, setTopsData] = useState([]);
  const [bottomsData, setBottomsData] = useState([]);
  const [shoesData, setShoesData] = useState([]);
  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottom, setSelectedBottom] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchImage = async (imageName, headers) => {
        const response = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${imageName}`, { headers });
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      };

      const fetchAllImages = async (items, headers) => {
        return Promise.all(items.map(async item => {
          const imageUrl = await fetchImage(item.imageName, headers);
          return imageUrl;
        }));
      };

      try {
        const token = localStorage.getItem('authToken');
        const headers = { 'authToken': token };
        const response = await fetch('https://swipeurstyleback.azurewebsites.net/garments', { headers });
        const data = await response.json();
        const topsData = data.filter(item => item.category === 'TOP');
        const bottomsData = data.filter(item => item.category === 'BOTTOM');
        const shoesData = data.filter(item => item.category === 'SHOES');

        setTopsData(topsData);
        setBottomsData(bottomsData);
        setShoesData(shoesData);

        const topsImages = await fetchAllImages(topsData, headers);
        const bottomsImages = await fetchAllImages(bottomsData, headers);
        const shoesImages = await fetchAllImages(shoesData, headers);

        setTops(topsImages);
        setBottoms(bottomsImages);
        setShoes(shoesImages);
        setLoadingImages(false);
      } catch (error) {
        console.error('Error fetching garments:', error);
      }
    };

    fetchData();
  }, []);

  const changeClothing = (type, direction) => {
    let selected, setSelected, items;
    if (type === 'top') {
      [selected, setSelected, items] = [selectedTop, setSelectedTop, tops];
    } else if (type === 'bottom') {
      [selected, setSelected, items] = [selectedBottom, setSelectedBottom, bottoms];
    } else if (type === 'shoes') {
      [selected, setSelected, items] = [selectedShoes, setSelectedShoes, shoes];
    }
    const newIndex = direction === 'next' ? (selected + 1) % items.length : (selected - 1 + items.length) % items.length;
    setSelected(newIndex);
  };

  const handleSave = async () => {
    const selectedOutfit = {
      topId: topsData[selectedTop].id,
      bottomId: bottomsData[selectedBottom].id,
      shoesId: shoesData[selectedShoes].id,
    };
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      'authToken': token
    };

    try {
      const postResponse = await fetch('https://swipeurstyleback.azurewebsites.net/outfit', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(selectedOutfit)
      });
      if (!postResponse.ok) {
        throw new Error(`Failed to save outfit: ${postResponse.status}`);
      }
      const { id } = await postResponse.json();
      const patchResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/outfit/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ favorite: true })
      });
      if (patchResponse.ok) {
        swal('Outfit saved successfully!');
      } else {
        throw new Error(`Failed to mark outfit as favorite: ${patchResponse.status}`);
      }
    } catch (error) {
      swal('Error during save:', error.message);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleNext = async () => {
    if (selectedDate === null) {
      swal("Ups!", "Please select a date", "warning");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      swal("The selected date must be equal to or after today", "Choose Again", "warning");
      return;
    }
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      'authToken': token
    };
    const outfitToSchedule = {
      topId: topsData[selectedTop].id,
      bottomId: bottomsData[selectedBottom].id,
      shoesId: shoesData[selectedShoes].id,
    };
    try {
      const Response = await fetch('https://swipeurstyleback.azurewebsites.net/outfit', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(outfitToSchedule)
      });
      if (!Response.ok) {
        throw new Error(`Failed to save outfit: ${Response.status}`);
      }
      const scheduledDate = new Date(selectedDate);
      const scheduledDateString = scheduledDate.toISOString().split('T')[0];
      const { id } = await Response.json();
      const patchResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/outfit/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ scheduledFor: scheduledDateString })
      });
      if (patchResponse.ok) {
        swal('Outfit scheduled successfully!');
      } else {
        throw new Error(`Failed to schedule outfit: ${patchResponse.status}`);
      }
    } catch (error) {
      swal('Error during save:', error.message);
    }
    setSelectedDate('');
    setShowCalendar(false);
  };

  return (
    <div className="containerSelector">
      {loadingImages && <p>Uploading images...</p>}
      <div className="row">
        {tops.length > 0 && <>
          <img className="top-item" src={tops[(selectedTop + tops.length - 2) % tops.length]} alt="top" />
          <img className="top-item" src={tops[(selectedTop + tops.length - 1) % tops.length]} alt="top" />
          <button className="button" onClick={() => changeClothing('top', 'next')}>←</button>
          <img className="top-item" src={tops[selectedTop]} alt="top" />
          <button className="button" onClick={() => changeClothing('top', 'prev')}>→</button>
          <img className="top-item" src={tops[(selectedTop + 1) % tops.length]} alt="top" />
          <img className="top-item" src={tops[(selectedTop + 2) % tops.length]} alt="top" />
        </>}
      </div>
      <div className="row">
        {bottoms.length > 0 && <>
          <img className="bottom-item" src={bottoms[(selectedBottom + bottoms.length - 2) % bottoms.length]} alt="bottom" />
          <img className="bottom-item" src={bottoms[(selectedBottom + bottoms.length - 1) % bottoms.length]} alt="bottom" />
          <button className="button" onClick={() => changeClothing('bottom', 'next')}>←</button>
          <img className="bottom-item" src={bottoms[selectedBottom]} alt="bottom" />
          <button className="button" onClick={() => changeClothing('bottom', 'prev')}>→</button>
          <img className="bottom-item" src={bottoms[(selectedBottom + 1) % bottoms.length]} alt="bottom" />
          <img className="bottom-item" src={bottoms[(selectedBottom + 2) % bottoms.length]} alt="bottom" />
        </>}
      </div>
      <div className="row">
        {shoes.length > 0 && <>
          <img className="shoe-item" src={shoes[(selectedShoes + shoes.length - 2) % shoes.length]} alt="shoes" />
          <img className="shoe-item" src={shoes[(selectedShoes + shoes.length - 1) % shoes.length]} alt="shoes" />
          <button className="button" onClick={() => changeClothing('shoes', 'next')}>←</button>
          <img className="shoe-item" src={shoes[selectedShoes]} alt="shoes" />
          <button className="button" onClick={() => changeClothing('shoes', 'prev')}>→</button>
          <img className="shoe-item" src={shoes[(selectedShoes + 1) % shoes.length]} alt="shoes" />
          <img className="shoe-item" src={shoes[(selectedShoes + 2) % shoes.length]} alt="shoes" />
        </>}
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button onClick={() => setShowCalendar(!showCalendar)} className="schedule-button">Schedule</button>
        {showCalendar && (
          <div className="modalSchedule-overlay">
            <div className="modalSchedule-content">
              <button className="modalSchedule-close" onClick={() => setShowCalendar(false)}>X</button>

              <DatePicker
                selected={selectedDate}
                onChange={handleDateSelect}
                dateFormat="yyyy-MM-dd"
              />
              <button onClick={handleNext}>Siguiente</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingSelector;
