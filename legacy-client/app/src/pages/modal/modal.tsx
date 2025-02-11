import React, { useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddCategoryModal from './addCategoryModal';
import DeleteCategoryModal from './deleteCategoryModal';
import * as style from './style';

type Prop = {
  background: string
}
const Modal: React.FC<Prop> = ({ background }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <style.background
      onClick={(e: any) => {
        if(e.target.closest('.modal_box')) return;
        navigate(-1);
      }}>
      <div className='modal_box'>
        <Routes>
          <Route path='category' element={<AddCategoryModal ref={ref} background={background}/>} />
          <Route path='deletecategory' element={<DeleteCategoryModal ref={ref}/>} />
        </Routes>
      </div>
    </style.background>
  );
};

export default Modal;