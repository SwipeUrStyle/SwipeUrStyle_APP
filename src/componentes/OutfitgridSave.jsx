import React, { useState, useEffect } from 'react';
import './outfits.css';
import './OutfitGridWithLikes.css';
const OutfitGridSave = () => {
  const outfits = [
    { id: 1, name: 'Outfit 1', image: require('../imagenes/outfits/1.png') },
    { id: 2, name: 'Outfit 2', image: require('../imagenes/outfits/2.png') },
    { id: 3, name: 'Outfit 3', image: require('../imagenes/outfits/3.png') },
    { id: 4, name: 'Outfit 4', image: require('../imagenes/outfits/4.png') },
    { id: 5, name: 'Outfit 5', image: require('../imagenes/outfits/5.png') },
    { id: 6, name: 'Outfit 6', image: require('../imagenes/outfits/6.png') },
    { id: 7, name: 'Outfit 7', image: require('../imagenes/outfits/7.png') },
    { id: 8, name: 'Outfit 8', image: require('../imagenes/outfits/8.png') },
    { id: 9, name: 'Outfit 9', image: require('../imagenes/outfits/9.png') },
    { id: 10, name: 'Outfit 10', image: require('../imagenes/outfits/10.png') },
    { id: 11, name: 'Outfit 11', image: require('../imagenes/outfits/11.png') },
    { id: 12, name: 'Outfit 12', image: require('../imagenes/outfits/12.png') }
  ];

  const [visibleCount, setVisibleCount] = useState(10);
  const [saved, setSaved] = useState(() => {
    const savedFromLocalStorage = JSON.parse(localStorage.getItem('savedOutfits'));
    return savedFromLocalStorage || Array(outfits.length).fill(false);
  });

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10);
  };

  const handleSave = id => {
    const index = outfits.findIndex(outfit => outfit.id === id);
    const newSaved = [...saved];
    newSaved[index] = !newSaved[index];
    setSaved(newSaved);
  };

  useEffect(() => {
    localStorage.setItem('savedOutfits', JSON.stringify(saved));
  }, [saved]);

  const compareSavedStatus = (a, b) => {
    const indexA = outfits.findIndex(outfit => outfit.id === a.id);
    const indexB = outfits.findIndex(outfit => outfit.id === b.id);
    if (saved[indexA] === saved[indexB]) {
      return 0;
    }
    return saved[indexA] ? -1 : 1;
  };

  const sortedOutfits = outfits.slice().sort(compareSavedStatus);

  return (
    <div className="outfit-container">
      {sortedOutfits.slice(0, visibleCount).map(outfit => (
        <div key={outfit.id} className="outfits-item">
          <img src={outfit.image} alt={outfit.name} 
          />
          <button
            className="save-icon"
            onClick={() => handleSave(outfit.id)}
          >
            <img
              src={require(`../imagenes/${saved[outfits.findIndex(o => o.id === outfit.id)] ? 'save-blue' : 'save-grey'}.PNG`)}
              alt="save"
            />
          </button>
        </div>
      ))}
      {visibleCount < outfits.length && (
        <button className="more-button" onClick={handleLoadMore}>More</button>
      )}
    </div>
  );
};

export default OutfitGridSave;
