import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Header from './componentes/Header';
import Options from './componentes/Options';
import ClothingSelector from './componentes/ClothingSelector';
import OutfitgridSave from './componentes/OutfitgridSave';
import OutfitGridWithLikes from './componentes/OutfitGridWithLikes';
import ClosetOptions from './componentes/ClosetOptions';
import ClosetGrid from './componentes/ClosetGrid';
import AcountOptions from './componentes/AcountOptions';
import UserInfoGrid from './componentes/UserInfoGrid';
import ConfigurationsUser from './componentes/ConfigurationsUser';

function App() {
  return (
    <div className="App">
       <Header/>
      <Routes>
        <Route path="/Styling/*" element={
          <div>
            <Options />
            <Routes>
              <Route index element={<div></div>} />
              <Route path="Swipe ur syle" element={<ClothingSelector/>} />
              <Route path="inspiration" element={<OutfitgridSave/>} />
              <Route path="Ur favorites" element={<OutfitGridWithLikes/>} />
            </Routes>
          </div>
        } />
        <Route path="/schedule" element={<div></div>} />
        <Route path="/closet/*" element={
          <div>
            {<ClosetOptions/>}
            <Routes>
            <Route path="My Closet" element={<ClosetGrid/>} />
            <Route path="Paper Bin" element={<div>Contenido de My Paper Bin</div>} />
            </Routes>
          </div>
            } />
        <Route path="/account*" element={
          <div>
            {<AcountOptions/>}
            <Routes>
            <Route path="Account" element={<UserInfoGrid/> } />
            <Route path="Configurations" element={<ConfigurationsUser/>} />
            </Routes>
          </div>
         } />
      </Routes>
    </div>
  );
}

export default App;
