import React, { useState } from 'react';
import './clothingselector.css';

// Importa las imágenes
import top1 from '../imagenes/2.png';
import top2 from '../imagenes/3.png';
import top3 from '../imagenes/5.png';
import top4 from '../imagenes/7.png';
import top5 from '../imagenes/8.png';
import bottom1 from '../imagenes/1.png';
import bottom2 from '../imagenes/4.png';
import bottom3 from '../imagenes/6.png';
import bottom4 from '../imagenes/9.png';
import bottom5 from '../imagenes/11.png';
import shoe1 from '../imagenes/10.png';
import shoe2 from '../imagenes/12.png';

const ClothingSelector = () => {
  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottom, setSelectedBottom] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  // Arregla las rutas de las imágenes
  const tops = [top1, top2, top3, top4, top5];
  const bottoms = [bottom1, bottom2, bottom3, bottom4, bottom5];
  const shoes = [shoe1, shoe2];

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
    <div className="containerSelector">
      <div className="row">
        <img className="item" src={tops[(selectedTop + tops.length - 2) % tops.length]} alt="top"/>
        <img className="item" src={tops[(selectedTop + tops.length - 1) % tops.length]} alt="top"/>
        <button className="button" onClick={() => changeClothing('top', 'next')}>←</button>
        <img className="item" src={tops[selectedTop]} alt="top"/>
        <button className="button" onClick={() => changeClothing('top', 'prev')}>→</button>
        <img className="item" src={tops[(selectedTop + 1) % tops.length]} alt="top"/>
        <img className="item" src={tops[(selectedTop + 2) % tops.length]} alt="top"/>
      </div>
      <div className="row">
        <img className="item" src={bottoms[(selectedBottom + bottoms.length - 2) % bottoms.length]} alt="bottom"/>
        <img className="item" src={bottoms[(selectedBottom + bottoms.length - 1) % bottoms.length]} alt="bottom"/>
        <button className="button" onClick={() => changeClothing('bottom', 'next')}>←</button>
        <img className="item" src={bottoms[selectedBottom]} alt="bottom"/>
        <button className="button" onClick={() => changeClothing('bottom', 'prev')}>→</button>
        <img className="item" src={bottoms[(selectedBottom + 1) % bottoms.length]} alt="bottom"/>
        <img className="item" src={bottoms[(selectedBottom + 2) % bottoms.length]} alt="bottom"/>
      </div>
      <div className="row">
        <img className="item" src={shoes[(selectedShoes + shoes.length - 2) % shoes.length]} alt="shoes"/>
        <img className="item" src={shoes[(selectedShoes + shoes.length - 1) % shoes.length]} alt="shoes"/>
        <button className="button" onClick={() => changeClothing('shoes', 'next')}>←</button>
        <img className="item" src={shoes[selectedShoes]} alt="shoes"/>
        <button className="button" onClick={() => changeClothing('shoes', 'prev')}>→</button>
        <img className="item" src={shoes[(selectedShoes + 1) % shoes.length]} alt="shoes"/>
        <img className="item" src={shoes[(selectedShoes + 2) % shoes.length]} alt="shoes"/>
      </div>
      <button className="choose-button">Choose</button>
    </div>
  );
};

export default ClothingSelector;
