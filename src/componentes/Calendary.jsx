import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './calendary.css';
import swal from 'sweetalert';

function Calendary() {
  const [value, setValue] = useState(new Date());
  const [scheduledOutfits, setScheduledOutfits] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outfitImages, setOutfitImages] = useState({}); // Estado para almacenar las imágenes de los atuendos

  useEffect(() => {
    const fetchScheduledOutfits = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };

        const response = await fetch('https://swipeurstyleback.azurewebsites.net/outfits/scheduled', { headers });
        const data = await response.json();
        setScheduledOutfits(data);
      } catch (error) {
        console.error('Error fetching scheduled outfits:', error);
        swal('Error fetching scheduled outfits', error.message, 'error');
      }
    };

    fetchScheduledOutfits();
  }, []);

  const convertToLocalDate = (dateString) => {
    const utcDate = new Date(dateString);
    return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  };

  const handleTileClick = async (date) => {
    const outfit = scheduledOutfits.find(outfit => {
      const scheduledDate = convertToLocalDate(outfit.scheduledFor);
      return scheduledDate.toDateString() === date.toDateString();
    });

    if (outfit) {
      setSelectedOutfit(outfit);
      setIsModalOpen(true);

      // Descargar las imágenes del atuendo solo cuando se hace clic en la fecha
      const token = localStorage.getItem('authToken');
      const headers = {
        'authToken': token
      };
      const topImageUrl = await fetchImage(outfit.top.imageName, headers);
      const bottomImageUrl = await fetchImage(outfit.bottom.imageName, headers);
      const shoesImageUrl = await fetchImage(outfit.shoes.imageName, headers);

      setOutfitImages({
        top: topImageUrl,
        bottom: bottomImageUrl,
        shoes: shoesImageUrl
      });
    }
  };

  const fetchImage = async (imageName, headers) => {
    const response = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${imageName}`, { headers });
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isScheduled = scheduledOutfits.some(outfit => {
        const scheduledDate = convertToLocalDate(outfit.scheduledFor);
        return scheduledDate.toDateString() === date.toDateString();
      });
      return isScheduled ? (
        <div
          className="scheduled-button"
          onClick={() => handleTileClick(date)}
          role="button"
          tabIndex="0" // Asegura que el elemento sea enfocable mediante el teclado
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleTileClick(date); // Maneja el evento de presionar Enter o Barra espaciadora
            }
          }}
        >
          <img src={require('../imagenes/13.png')} alt="scheduled" className="scheduled-icon" />
        </div>
      ) : null;
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setValue}
        value={value}
        locale="en-US"
        tileContent={tileContent}
      />
      {isModalOpen && (
        <div className="modals">
          <div className="modals-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="white-text">Da igual</h2>
            {selectedOutfit && (
              <div className="outfits-images-container"> {/* Contenedor de las imágenes */}
                <h2>Outfit for {new Date(selectedOutfit.scheduledFor).toDateString()}</h2>
                <img src={outfitImages.top} alt="Top" className="outfits-image" />
                <img src={outfitImages.bottom} alt="Bottom" className="outfits-image" />
                <img src={outfitImages.shoes} alt="Shoes" className="outfits-image" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendary;
