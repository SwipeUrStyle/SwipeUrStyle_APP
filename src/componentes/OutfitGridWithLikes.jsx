import React from 'react';
import './outfits.css';

const OutfitGridWithLikes = () => {
  const outfits = ['Outfit 1', 'Outfit 2', 'Outfit 3', 'Outfit 4', 'Outfit 5', 'Outfit 6', 'Outfit 7', 'Outfit 8', 'Outfit 9', 'Outfit 10', 'Outfit 11', 'Outfit 12']; 
  const [visibleCount, setVisibleCount] = React.useState(10); 

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10); 
  };

  return (
    <div className="outfit-container">
      {outfits.slice(0, visibleCount).map((outfit, index) => (
        <div key={index} className="outfit-item">
          {outfit}
          <img src={require('../imagenes/like-blue.PNG')} alt="like" style={{position: 'absolute', bottom: 0, right: 0}}/>
        </div>
      ))}
      {visibleCount < outfits.length && (
        <button className="more-button" onClick={handleLoadMore}>More</button>
      )}
    </div>
  );
};

export default OutfitGridWithLikes;
