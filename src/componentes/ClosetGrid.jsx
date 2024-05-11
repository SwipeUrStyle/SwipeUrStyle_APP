import React, { useState } from 'react';
import './outfits.css';

const ClosetGrid = () => {
  const outfits = ['outfit1.png', 'outfit2.png', 'outfit3.png', 'outfit4.png', 'outfit5.png', 'outfit6.png'];

  const [like, setLike] = useState(Array(outfits.length).fill(false)); // Crea el estado like

  const handleLike = index => {
    const newLike = [...like];
    newLike[index] = !newLike[index];
    setLike(newLike);
  };

  return (
    <div className="closet-container">
      <button className="add-clothes-button">Add Clothes</button>
      <div className="outfit-container">
        {outfits.map((outfit, index) => (
          <div key={index} className="outfit-item">
            <img src={require(`../imagenes/${outfit}`)} alt={`Outfit ${index + 1}`} style={{ width: '200px', height: '200px' }} />
            <img src={require(`../imagenes/trash-icon.PNG`)} alt="delete" style={{ position: 'absolute', bottom: 10, right: 50 }} /> 
            <button className="update-button" style={{ position: 'absolute', bottom: 10, left: 10 }}>Update</button>
            <img src={require(`../imagenes/${like[index] ? 'like-blue' : 'like-grey'}.PNG`)} alt="save" style={{ position: 'absolute', bottom: 10, right: 10 }} onClick={() => handleLike(index)} /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosetGrid;
