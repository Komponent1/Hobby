import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './addCategoryModal';

type Prop = {

}
const Modal: React.FC<Prop> = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1500}}>
      <Routes>
        <Route path='test' element={<AddCategoryModal />} />
      </Routes>
    </div>
  );
};

export default Modal;