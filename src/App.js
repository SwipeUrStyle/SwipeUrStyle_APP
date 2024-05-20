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
import LoginSignUp from './componentes/LoginSignUp';
import TrashGrid from './componentes/TrashGrid';
import Calendary from './componentes/Calendary';
import CalendaryOptions from './componentes/CalendaryOptions';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/Styling/*" element={
          <div>
            <Header />
            <Options />
            <Routes>
              <Route index element={<div></div>} />
              <Route path="Swipe ur syle" element={<ClothingSelector/>} />
              <Route path="inspiration" element={<OutfitgridSave />} />
              <Route path="Ur favorites" element={<OutfitGridWithLikes />} />
            </Routes>
          </div>
        } />
        <Route path="/schedule/*" element={ <div>
             {<Header/> }
            {<CalendaryOptions/>}
            <Routes>
              <Route path="MySchedule" element={<Calendary/>} />
            </Routes>
          </div>} />
        <Route path="/closet/*" element={
          <div>
             {<Header/> }
            {<ClosetOptions/>}
            <Routes>
              <Route path="My Closet" element={<ClosetGrid />} />
              <Route path="Paper Bin" element={<TrashGrid/>} />
            </Routes>
          </div>
        } />
        <Route path="/account*" element={
          <div>
            {<Header/> }
            {<AcountOptions />}
            <Routes>
              <Route path="Account" element={<UserInfoGrid />} />
              <Route path="Configurations" element={<ConfigurationsUser />} />
            </Routes>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;



