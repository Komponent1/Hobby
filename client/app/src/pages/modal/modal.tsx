import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './addCategoryModal';
import DeleteCategoryModal from './deleteCategoryModal';

type Prop = {

}
const Modal: React.FC<Prop> = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={(e: any) => {
        if(e.target.closest('.modal_box')) return;
        navigate(-1);
      }}
      style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1500}}>
      <div className='modal_box'>
        <Routes>
          <Route path='category' element={<AddCategoryModal ref={ref}/>} />
          <Route path='deletecategory' element={<DeleteCategoryModal ref={ref}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Modal;