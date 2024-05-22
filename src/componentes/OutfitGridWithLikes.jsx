import React, { useEffect, useState } from 'react';
import './outfits.css';import './OutfitGridWithLikes.css';
import swal from 'sweetalert';
const OutfitGridWithLikes = () => {
  const [outfits, setOutfits] = useState([]);
  const [images, setImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };

        console.log('Headers being sent:', headers);

        const response = await fetch('https://swipeurstyleback.azurewebsites.net//outfits/favorites', { headers });
        const data = await response.json();
        // Filtrar los outfits que tienen el atributo 'favorite' establecido en true
        const favoriteOutfits = data.filter(outfit => outfit.favorite);
        setOutfits(favoriteOutfits);

        for (const outfit of favoriteOutfits) {
          const topImageResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${outfit.top.imageName}`, { headers });
          const topBlob = await topImageResponse.blob();
          const topImageUrl = URL.createObjectURL(topBlob);

          const bottomImageResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${outfit.bottom.imageName}`, { headers });
          const bottomBlob = await bottomImageResponse.blob();
          const bottomImageUrl = URL.createObjectURL(bottomBlob);

          const shoesImageResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${outfit.shoes.imageName}`, { headers });
          const shoesBlob = await shoesImageResponse.blob();
          const shoesImageUrl = URL.createObjectURL(shoesBlob);

          setImages(prevImages => ({
            ...prevImages,
            [outfit.id]: {
              top: topImageUrl,
              bottom: bottomImageUrl,
              shoes: shoesImageUrl
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10);
  };
  const handleDeleteOutfit = async (outfitId) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once confirmed, this amazing outfit will disappear from your favorites!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
  
      if (willDelete) {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Content-Type': 'application/json',
          'authToken': token
        };
  
        const response = await fetch(`https://swipeurstyleback.azurewebsites.net/outfit/${outfitId}`, {
          method: 'DELETE',
          headers: headers,
        });
  
        if (response.ok) {
          // Eliminación exitosa, actualizar el estado para reflejar los cambios
          setOutfits(prevOutfits => prevOutfits.filter(outfit => outfit.id !== outfitId));
          swal('Outfit removed from favorites successfully!', {
            icon: "success",
          });
        } else {
          // Error al eliminar
          throw new Error(`Failed to delete outfit: ${response.status}`);
        }
      }
    } catch (error) {
      swal('Error deleting outfit:', error.message, {
        icon: "error",
      });
    }
  };
  return (
    <div className="outfit-container">
      {outfits.slice(0, visibleCount).map((outfit, index) => (
        <div key={outfit.id} className="outfit-itemm">
          {images[outfit.id] && (
            <>
              <img src={images[outfit.id].top} alt="top" className="outfit-imagee" /><img
              src={images[outfit.id].bottom} alt="bottom" className="outfit-bottom" /><img
              src={images[outfit.id].shoes} alt="shoes" className="outfit-imagee" />
            </>
          )}
           <button style={{ position: 'absolute', bottom: 5, right: 5, border: 'none', background: 'none' }} onClick={() => handleDeleteOutfit(outfit.id)}>
           <img src={require('../imagenes/like-blue.PNG')} alt="like" className="like-iconn" />
            </button> 
        </div>
      ))}
      {visibleCount < outfits.length && (
        <button className="more-button" onClick={handleLoadMore}>More</button>
      )}
    </div>
  );
};
 
export default OutfitGridWithLikes;