import React, { useState, useEffect } from 'react';
import './outfits.css';
import swal from 'sweetalert';
const TrashGrid = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState({});
  const daysLeft = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };

        console.log('Headers being sent:', headers);

        const response = await fetch('https://swipeurstyleback.azurewebsites.net/garments/trash', { headers });
        const data = await response.json();
        setItems(data);

        for (const garment of data) {
          const imageResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${garment.imageName}`, { headers });
          const blob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImages(prevImages => ({ ...prevImages, [garment.imageName]: imageUrl }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const restoreGarment = async (id) => {
    const willRestore = await swal({
      title: "Are you sure?",
      text: "You will recover this garment!",
      icon: "info",
      buttons: true,
      dangerMode: true,
    });

    if (willRestore) {
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
        swal('Garment restore succesfull', 'Congratulations', 'success');
      } else {
        swal('Failed to restore garment');
      }
    } catch (error) {
      swal('Error restoring garment:', error);
    }
  }};

  return (
    <div>
      <div className="info-text">
        Clothes deleted from the closet stay in the paper bin for {daysLeft} days before being permanently deleted.
      </div>
      <div className="trash-grid-container">
        {items.map((outfit) => (
          <div key={outfit.id} className="trash-item">
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
