import React, { useState } from 'react';
import Modal from 'react-modal';
import './outfits.css'; // Importa el archivo CSS existente
import './Formulary.css'; // Importa el nuevo archivo CSS

const ClosetGrid = () => {
  const outfits = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png'];

  const [like, setLike] = useState(Array(outfits.length).fill(false)); // Crea el estado like
  const [showForm, setShowForm] = useState(false);
  const [clothing1, setClothing1] = useState('');
  const [category1, setCategory1] = useState('');
  const [description1, setDescription1] = useState('');
  const [image1, setImage1] = useState('');

  const handleLike = index => {
    const newLike = [...like];
    newLike[index] = !newLike[index];
    setLike(newLike);
  };

  const handleAddClothes = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = () => {
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    // Por ejemplo, puedes enviar los datos al servidor o realizar otras acciones necesarias
    console.log('Prenda 1:', clothing1);
    console.log('Category 1:', category1);
    console.log('Description 1:', description1);
    console.log('Image 1:', image1);
    // Después de enviar los datos, puedes cerrar el formulario
    setShowForm(false);
  };

  return (
    <div className="closet-container">
      <button className="add-clothes-button" onClick={handleAddClothes}>Add Clothes</button>
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
      <Modal
        isOpen={showForm}
        onRequestClose={handleCloseForm}
        contentLabel="Add Clothes"
        style={{
          content: {
            position: 'fixed',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '5px solid rgb(112, 111, 229)',
            background: 'rgb(255, 255, 255)',
            overflow: 'auto',
            borderRadius: '4px',
            outline: 'none',
            padding: '5px', // Modifica este valor para ajustar el tamaño del contenedor
            width: '840px', // Modifica este valor para ajustar el ancho del contenedor
            height: '402px', // Modifica este valor para ajustar la altura del contenedor
          }
        }}
      >
        <div className="modal-content">
          <button className="centered-purple-button">
            Add Clothes
          </button>
          <h2>
          </h2>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-tshirt'></i></span>
            <input type='text' id='clothing' className='form-control' placeholder='Clothes' value={clothing1} onChange={(e) => setClothing1(e.target.value)} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-list'></i></span>
            <input type='text' id='category' className='form-control' placeholder='Category' value={category1} onChange={(e) => setCategory1(e.target.value)} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
            <input type='text' id='description' className='form-control' placeholder='Description' value={description1} onChange={(e) => setDescription1(e.target.value)} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
            <input type='file' id='image' className='form-control' accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />
          </div>


          <div className='button-container'>
            <button onClick={handleSubmitForm} className='btn-success'>
              <i className='fa-solid fa-floppy-disk'></i> Save
            </button>
            <button onClick={handleCloseForm} className='close-button-modal-different-color'>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClosetGrid;