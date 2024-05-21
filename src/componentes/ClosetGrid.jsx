import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './outfits.css';
import './Formulary.css';

const ClosetGrid = () => {
  const [outfits, setOutfits] = useState([]);
  const [like, setLike] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [clothing1, setClothing1] = useState('');
  const [category1, setCategory1] = useState('');
  const [description1, setDescription1] = useState('');
  const [image1, setImage1] = useState('');
  const [images, setImages] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const headers = {
      'authToken': token
    };

    console.log('Headers being sent:', headers);

    fetch('https://swipeurstyleback.azurewebsites.net/garments', { headers })
      .then(response => response.json())
      .then(data => {
        setOutfits(data);
        setLike(Array(data.length).fill(false));
        // Download images
        data.forEach(outfit => {
          fetch(`https://swipeurstyleback.azurewebsites.net/image/${outfit.imageName}`, { headers })
            .then(response => response.blob())
            .then(blob => {
              const imageUrl = URL.createObjectURL(blob);
              setImages(prevImages => ({ ...prevImages, [outfit.imageName]: imageUrl }));
            })
            .catch(error => {
              console.error('Error fetching image:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching outfits:', error);
      });
  }, []);

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

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateClothing, setUpdateClothing] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateFoto, setUpdateFoto] = useState('');

  const handleOpenUpdateForm = (index) => {
    setUpdateClothing(outfits[index].name);
    setUpdateCategory(outfits[index].category);
    setUpdateDescription(outfits[index].description);
    setUpdateFoto(outfits[index].id);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateFormSubmit = () => {
    // Lógica para enviar los datos actualizados al servidor
    setShowUpdateForm(false);
  };

  const handleSubmitForm = () => {
    // Verificar que los campos no estén vacíos
    if (!clothing1 || !category1 || !description1 || !image1) {
      alert('Please fill in all required fields.');
      return;
    }
    const token = localStorage.getItem('authToken');
    // Primero, enviar la imagen
    const imageFormData = new FormData();
    imageFormData.append('image', image1);
    fetch('https://swipeurstyleback.azurewebsites.net/image', {
      method: 'POST',
      headers: {
        'authToken': token,
      },
      body: imageFormData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        return response.json(); // Aquí esperamos la respuesta de la subida de la imagen
      })
    // Si la imagen se cargó correctamente, enviar el resto de los datos
    const garmentData = {
      name: clothing1,
      description: description1,
      category: category1,
      imageName: image1.name // Suponiendo que la respuesta contiene el nombre del archivo
    };
    console.log('Data to be sent:', garmentData);
    return fetch('https://swipeurstyleback.azurewebsites.net/garment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': token,
      },
      body: JSON.stringify(garmentData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add garment');
        }
        return response.json();
      })
      .then(data => {
        setOutfits([...outfits, data]);
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error adding clothes:', error);
      });
  };
  return (
    <div className="closet-container">
      <button className="add-clothes-button" onClick={handleAddClothes}>Add Clothes</button>
      <div className="outfit-container">
        {outfits.map((outfit, index) => {
          const imageUrl = images[outfit.imageName];
          return (
            <div key={outfit.id} className="outfit-item" style={{ position: 'relative', textAlign: 'center' }}>
              {imageUrl ? (
                <img src={imageUrl} alt={outfit.name} style={{ width: '200px', height: '200px', marginTop: '-50px' }} />
              ) : (
                <p>Loading image...</p>
              )}
              <p className="outfit-name" style={{ marginTop: '10px', textAlign: 'center' }}>{outfit.name}</p>
              <button className="update-button" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)' }} onClick={() => handleOpenUpdateForm(index)}>Update</button>
              <img src={require(`../imagenes/trash-icon.PNG`)} alt="delete" style={{ position: 'absolute', bottom: 10, right: 50 }} />
              <img src={require(`../imagenes/${like[index] ? 'like-blue' : 'like-grey'}.PNG`)} alt="save" style={{ position: 'absolute', bottom: 15, right: 10 }} onClick={() => handleLike(index)} />
            </div>
          );

        })}

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
            padding: '5px',
            width: '840px',
            height: '402px',
          }
        }}
      >
        <div className="modal-content">
          <button className="centered-purple-button">
            Add Clothes
          </button>
          <h2></h2>
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
      <Modal
        isOpen={showUpdateForm}
        onRequestClose={handleCloseUpdateForm}
        contentLabel="Update Clothes"
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
            padding: '5px',
            width: '840px',
            height: '402px',
          }
        }}
      >
        <div className="modal-content">
          <button className="centered-purple-button">
            Update Clothes
          </button>
          <h2></h2>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-tshirt'></i></span>
            <input type='text' id='clothing' className='form-control' placeholder='Clothes' value={updateClothing} onChange={(e) => setUpdateClothing(e.target.value)} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-list'></i></span>
            <input type='text' id='category' className='form-control' placeholder='Category' value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
            <input type='text' id='description' className='form-control' placeholder='Description' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
          </div>

          <div className='button-container'>
            <button onClick={handleUpdateFormSubmit} className='btn-success'>
              <i className='fa-solid fa-floppy-disk'></i> Save
            </button>
            <button onClick={handleCloseUpdateForm} className='close-button-modal-different-color'>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClosetGrid;