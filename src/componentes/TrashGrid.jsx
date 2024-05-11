import React from 'react';
import './outfits.css';

const TrashGrid = () => {
  const items = ['Outfit 1', 'Outfit 2', 'Outfit 3', 'Outfit 4', 'Outfit 5', 'Outfit 6'];

  const daysLeft = 30;

  return (
    <div>
      <div className="info-text">
        Clothes deleted from the closet stay in the paper bin for {daysLeft} days before being permanently deleted
      </div>
      <div className="trash-grid-container">
        {items.map((outfit, index) => (
          <div key={index} className="trash-item">
            <div className="outfit-name">{outfit}</div>
            <div className="days-left">{daysLeft} days left</div>
            <button className="restore-button">Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashGrid;
