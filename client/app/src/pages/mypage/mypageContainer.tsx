import React, { useEffect } from 'react';
import { rootState } from '../../store';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MypagePresenter from './mypagePresenter';
import { getCategory } from '../../store/category';
import { EMAIL } from '../../env';
import { useLoading } from '../../hooks';

const MypageContaier: React.FC = () => {
  const location = useLocation();
  const { data } = useSelector((state: rootState) => state.category);
  const dispatch = useDispatch();
  const { loading, navigate } = useLoading('category', '/mypage');
  useEffect(() => {
    dispatch(getCategory(EMAIL, loading));
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
