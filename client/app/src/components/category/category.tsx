import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';

const Category: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: rootState) => state.category);

  useEffect(() => {
    dispatch(getCategory('email'));
  }, []);

  useEffect(() => {
    console.log(loading, data, error);
  }, [ loading ]);

  /* click to category */
  const onClick = (idx: number) => {
    navigate(`?category_id=${data[idx].category_id}`);
  };

  return (
    <div>TEST</div>
  );
};

export default Category;