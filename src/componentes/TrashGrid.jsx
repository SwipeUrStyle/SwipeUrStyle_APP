import React, { useState, useEffect } from 'react';
import './outfits.css';

const TrashGrid = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState({});
  const daysLeft = 30;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const headers = {
      'authToken': token
    };

    console.log('Headers being sent:', headers);

    fetch('https://swipeurstyleback.azurewebsites.net/garments/trash', { headers })
      .then(response => response.json())
      .then(data => {
        setItems(data);
        // Download images
        data.forEach(garment => {
          fetch(`https://swipeurstyleback.azurewebsites.net/image/${garment.imageName}`, { headers })
            .then(response => response.blob())
            .then(blob => {
              const UrlImage = URL.createObjectURL(blob);
              setImages(prevImages => ({ ...prevImages, [garment.imageName]: UrlImage }));
            })
        });
      })
  }, []);

  const restoreGarment = async (id) => {
    const token = localStorage.getItem('authToken');
    const headers = {
      'authToken': token,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`https://swipeurstyleback.azurewebsites.net/garment/restore/${id}`, {
        method: 'PUT',
        headers
      });

      if (response.ok) {
        // Optionally, you can refresh the trash items or remove the restored item from the state
        setItems(items.filter(item => item.id !== id));
      } else {
        console.error('Failed to restore garment');
      }
    } catch (error) {
      console.error('Error restoring garment:', error);
    }
  };

  return (
    <div>
      <div className="info-text">
        Clothes deleted from the closet stay in the paper bin for {daysLeft} days before being permanently deleted.
      </div>
      <div className="trash-grid-container">
        {items.map((outfit, index) => (
          <div key={index} className="trash-item">
            {images[outfit.imageName] && (
              <img
                src={images[outfit.imageName]}
                alt={outfit.name}
                className={`trash-image ${outfit.category.toLowerCase()}-item`}
              />
            )}
            <div className="outfit-name">{outfit.name}</div>
            <div className="days-left">{daysLeft} days left</div>
            <button
              className="restore-button"
              onClick={() => restoreGarment(outfit.id)}
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashGrid;
