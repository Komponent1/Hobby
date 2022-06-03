import React, { useEffect } from 'react';
import { rootState } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MypagePresenter from './mypagePresenter';
import { getCategory } from '../../store/category';
import { EMAIL } from '../../env';

const MypageContaier: React.FC = () => {
  const location = useLocation();
  const { data } = useSelector((state: rootState) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategory(EMAIL));
  }, []);

  const openUpdateCategory = (category_id: string) => {
    navigate(`/modal/category?type=patch&category_id=${category_id}`,
    { state: { backgroundLocation: location }})
  };
  const openDeleteCategory = (category_id: string) => {
    navigate(`/modal/deletecategory?category_id=${category_id}`,
    { state: { backgroundLocation: location }})
  };
  const openNewCategory = () => {
    navigate(`/modal/category?type=post`,
    { state: { backgroundLocation: location }})
  }
  return (
    <MypagePresenter
      categories={data? data.categories : []}
      openNewCategory={openNewCategory}
      openUpdateCategory={openUpdateCategory}
      openDeleteCategory={openDeleteCategory}
    />
  )
};

export default MypageContaier;
