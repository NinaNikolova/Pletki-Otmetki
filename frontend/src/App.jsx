import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateKnitting from './pages/CreateKnitting';
import DeleteKnitting from './pages/DeleteKnitting';
import EditKnitting from './pages/EditKnitting';
import ShowKnitting from './pages/ShowKnitting';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/knittings/create' element={<CreateKnitting />} />
      <Route path='/knittings/details/:id' element={<ShowKnitting />} />
      <Route path='/knittings/edit/:id' element={<EditKnitting />} />
      <Route path='/knittings/delete/:id' element={<DeleteKnitting />} />
    </Routes>
  );
}
export default App;