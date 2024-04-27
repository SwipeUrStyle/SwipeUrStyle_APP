import React, { useState } from 'react';
import './outfits.css';

const OutfitGridSave = () => {
  const outfits = ['Outfit 1', 'Outfit 2', 'Outfit 3', 'Outfit 4', 'Outfit 5', 'Outfit 6', 'Outfit 7', 'Outfit 8', 'Outfit 9', 'Outfit 10', 'Outfit 11', 'Outfit 12']; 
  const [visibleCount, setVisibleCount] = useState(10); 
  const [saved, setSaved] = useState(Array(12).fill(false)); // Inicializa un array de "guardados"

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10); 
  };

  const handleSave = index => {
    const newSaved = [...saved];
    newSaved[index] = !newSaved[index];
    setSaved(newSaved);
  };

  return (
    <div className="outfit-container">
      {outfits.slice(0, visibleCount).map((outfit, index) => (
        <div key={index} className="outfit-item">
          {outfit}
          <img src={require(`../imagenes/${saved[index] ? 'save-blue' : 'save-grey'}.PNG`)} alt="save" style={{position: 'absolute', bottom: 0, right: 0}} onClick={() => handleSave(index)}/>
        </div>
      ))}
      {visibleCount < outfits.length && (
        <button className="more-button" onClick={handleLoadMore}>More</button>
      )}
    </div>
  );
};

export default OutfitGridSave;
