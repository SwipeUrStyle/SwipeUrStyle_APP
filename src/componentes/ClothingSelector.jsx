import React, { useState } from 'react';
import './clothingselector.css';

const ClothingSelector = () => {
  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottom, setSelectedBottom] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  const tops = ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5', 'Top 6', 'Top 7'];
  const bottoms = ['Bottom 1', 'Bottom 2', 'Bottom 3', 'Bottom 4', 'Bottom 5', 'Bottom 6', 'Bottom 7'];
  const shoes = ['Shoes 1', 'Shoes 2', 'Shoes 3', 'Shoes 4', 'Shoes 5', 'Shoes 6', 'Shoes 7'];

  const changeClothing = (type, direction) => {
    let selected;
    let setSelected;
    let items;

    if (type === 'top') {
      selected = selectedTop;
      setSelected = setSelectedTop;
      items = tops;
    } else if (type === 'bottom') {
      selected = selectedBottom;
      setSelected = setSelectedBottom;
      items = bottoms;
    } else if (type === 'shoes') {
      selected = selectedShoes;
      setSelected = setSelectedShoes;
      items = shoes;
    }

    const newIndex = direction === 'next' ? (selected + 1) % items.length : (selected - 1 + items.length) % items.length;
    setSelected(newIndex);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="item">{tops[(selectedTop + tops.length - 2) % tops.length]}</div>
        <div className="item">{tops[(selectedTop + tops.length - 1) % tops.length]}</div>
        <button className="button" onClick={() => changeClothing('top', 'next')}>←</button>
        <div className="item">{tops[selectedTop]}</div>
        <button className="button" onClick={() => changeClothing('top', 'prev')}>→</button>
        <div className="item">{tops[(selectedTop + 1) % tops.length]}</div>
        <div className="item">{tops[(selectedTop + 2) % tops.length]}</div>
      </div>
      <div className="row">
        <div className="item">{bottoms[(selectedBottom + bottoms.length - 2) % bottoms.length]}</div>
        <div className="item">{bottoms[(selectedBottom + bottoms.length - 1) % bottoms.length]}</div>
        <button className="button" onClick={() => changeClothing('bottom', 'next')}>←</button>
        <div className="item">{bottoms[selectedBottom]}</div>
        <button className="button" onClick={() => changeClothing('bottom', 'prev')}>→</button>
        <div className="item">{bottoms[(selectedBottom + 1) % bottoms.length]}</div>
        <div className="item">{bottoms[(selectedBottom + 2) % bottoms.length]}</div>
      </div>
      <div className="row">
        <div className="item">{shoes[(selectedShoes + shoes.length - 2) % shoes.length]}</div>
        <div className="item">{shoes[(selectedShoes + shoes.length - 1) % shoes.length]}</div>
        <button className="button" onClick={() => changeClothing('shoes', 'next')}>←</button>
        <div className="item">{shoes[selectedShoes]}</div>
        <button className="button" onClick={() => changeClothing('shoes', 'prev')}>→</button>
        <div className="item">{shoes[(selectedShoes + 1) % shoes.length]}</div>
        <div className="item">{shoes[(selectedShoes + 2) % shoes.length]}</div>
      </div>
      <button className="choose-button">Choose</button>
    </div>
  );
};

export default ClothingSelector;