import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './outfits.css';
import './Formulary.css';
import swal from 'sweetalert';

const ClosetGrid = () => {
  const [outfits, setOutfits] = useState([]);
  const [like, setLike] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [clothing1, setClothing1] = useState('');
  const [category1, setCategory1] = useState('');
  const [description1, setDescription1] = useState('');
  const [image1, setImage1] = useState('');
  const [images, setImages] = useState({});

  const [isClothingModified, setIsClothingModified] = useState(false);
  const [isCategoryModified, setIsCategoryModified] = useState(false);
  const [isDescriptionModified, setIsDescriptionModified] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'authToken': token
      };
  
      console.log('Headers being sent:', headers);
  
      const response = await fetch('https://swipeurstyleback.azurewebsites.net/garments', { headers });
      const data = await response.json();
      setOutfits(data);
      setLike(Array(data.length).fill(false));
  
      for (const outfit of data) {
        const imageResponse = await fetch(`https://swipeurstyleback.azurewebsites.net/image/${outfit.imageName}`, { headers });
        const blob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImages(prevImages => ({ ...prevImages, [outfit.imageName]: imageUrl }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
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
  const handleDelete = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "You will not be able to recover this garment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        const token = localStorage.getItem('authToken');
        const headers = {
          'authToken': token
        };

        const response = await fetch(`https://swipeurstyleback.azurewebsites.net/garment/${id}`, {
          method: 'DELETE',
          headers: headers
        });

        if (response.ok) {
          setOutfits(outfits.filter(outfit => outfit.id !== id));
          swal("Poof! Your garment has been deleted!", {
            icon: "success",
          });
        } else {
          console.error('Failed to delete garment');
          swal("Oops! Something went wrong!", {
            icon: "error",
          });
        }
      } else {
        swal("Your garment is safe!", "", "success");
      }
    } catch (error) {
      console.error('Error deleting garment:', error);
      swal("Oops! Something went wrong!", {
        icon: "error",
      });
    }
  };


  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateClothing, setUpdateClothing] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isUpdateClothingModified, setIsUpdateClothingModified] = useState(false);
  const [isUpdateCategoryModified, setIsUpdateCategoryModified] = useState(false);
  const [isUpdateDescriptionModified, setIsUpdateDescriptionModified] = useState(false);

  const handleOpenUpdateForm = (index) => {
    setUpdateClothing(outfits[index].name);
    setUpdateCategory(outfits[index].category);
    setUpdateDescription(outfits[index].description);
    setUpdateIndex(index);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    if (updateIndex === null) return;

    // Transform the category to uppercase if needed
    let updateCategoryUpperCase = updateCategory.toUpperCase();

    const id = outfits[updateIndex].id;
    const token = localStorage.getItem('authToken');
    const headers = {
      'authToken': token,
      'Content-Type': 'application/json'
    };

    console.log('Headers being sent:', headers);
    const raw = JSON.stringify({
      "category": updateCategoryUpperCase,
      "description": updateDescription,
      "name": updateClothing
    });

    try {
      const response = await fetch(`https://swipeurstyleback.azurewebsites.net/garment/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: raw
      });

      if (response.ok) {
        fetchData();
        swal('Outfit updated successfully:', 'Nice Job!', 'success');
      } else {
        swal('Failed to update outfit');
      }
    } catch (error) {
      swal('Error during update:', error.toString(), 'error');
    }

    setShowUpdateForm(false);
};


  const handleSubmitForm = () => {
    // Verificar que los campos no estén vacíos
    if (!clothing1 || !category1 || !description1 || !image1) {
      swal("Pay Attention!", "Please fill in all required fields.!")
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
        return response.json(); // Aquí esperamos la respuesta de la subida de la imagen
      })
      let categoryToPost = '';
    // Si la imagen se cargó correctamente, enviar el resto de los datos
    if (category1 === 'Top') {
      categoryToPost = 'TOP';
    } else if (category1 === 'Bottom') {
      categoryToPost = 'BOTTOM';
    } else if (category1 === 'Shoes') {
      categoryToPost = 'SHOES';
    }
    const garmentData = {
      name: clothing1,
      description: description1,
      category: categoryToPost,
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
        swal("Good job!", "You submit a new garment!", "success")
        fetchData();
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
                <img src={imageUrl} alt={outfit.name} style={{ width: '200px', height: '200px', marginTop: '-30px' }} />
              ) : (
                <p>Loading image...</p>
              )}
              <p className="outfit-name" style={{ marginTop: '10px', textAlign: 'center' }}>{outfit.name}</p>
              <button className="update-button" style={{ position: 'absolute', bottom: '15px', left: '61%', transform: 'translateX(-50%)' }} onClick={() => handleOpenUpdateForm(index)}>Update</button>
              <button style={{ position: 'absolute', bottom: 10, right: 50, border: 'none', background: 'none', cursor : 'pointer' }} onClick={() => handleDelete(outfit.id)}>
                <img src={require(`../imagenes/trash-icon.PNG`)} alt="delete" />
              </button>
              <button style={{ position: 'absolute', bottom: 15, right: 10, border: 'none', background: 'none', cursor : 'pointer'}} onClick={() => handleLike(index)}>
                <img src={require(`../imagenes/${like[index] ? 'like-blue' : 'like-grey'}.PNG`)} alt="save" />
              </button>
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
            height: '425px',
          }
        }}
      >
        <div className="modal-content">
          <button className="centered-purple-button">
            Add Clothes
          </button>
          <h2 className="white-text">Update Clothes</h2>
          <div className={`input-group mb-3 centered-input ${isClothingModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-tshirt'></i></span>
            <input type='text' id='clothing' className='form-control input-wide' placeholder='Clothes' value={clothing1} onChange={(e) => { setClothing1(e.target.value); setIsClothingModified(true); }} />
          </div>
          <div className={`input-group mb-3 centered-input ${isCategoryModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-list'></i></span>
            <select id='category' className='form-control input-categoryy' value={category1} onChange={(e) => { setCategory1(e.target.value); setIsCategoryModified(true); }}>
              <option value="">Select Category</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          <div className={`input-group mb-3 centered-input ${isDescriptionModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
            <input type='text' id='description' className='form-control input-wide' placeholder='Description' value={description1} onChange={(e) => { setDescription1(e.target.value); setIsDescriptionModified(true); }} />
          </div>
          <div className='input-group mb-3 centered-input'>
            <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
            <input type='file' id='image' className='form-control input-wide' accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />
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
          <h2 className="white-text">Update Clothes</h2>
          <div className={`input-group mb-3 centered-input ${isUpdateClothingModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-tshirt'></i></span>
            <input type='text' id='update-clothing' className='form-control input-wide' placeholder='Clothes' value={updateClothing} onChange={(e) => { setUpdateClothing(e.target.value); setIsUpdateClothingModified(true); }} />
          </div>
          <div className={`input-group mb-3 centered-input ${isUpdateCategoryModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-list'></i></span>
            <select id='update-category' className='form-control input-categoryy' value={updateCategory} onChange={(e) => { setUpdateCategory(e.target.value); setIsUpdateCategoryModified(true); }}>
              <option value={updateCategory}>{updateCategory}</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          <div className={`input-group mb-3 centered-input ${isUpdateDescriptionModified ? 'black-text' : ''}`}>
            <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
            <input type='text' id='update-description' className='form-control input-wide' placeholder='Description' value={updateDescription} onChange={(e) => { setUpdateDescription(e.target.value); setIsUpdateDescriptionModified(true); }} />
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