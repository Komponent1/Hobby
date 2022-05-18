import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: rootState) => state.category);

  useEffect(() => {
    dispatch(getCategory('test'));
  }, []);

  useEffect(() => {
    console.log(loading, data, error);
  }, [ loading ])

  return (
    <div>TEST</div>
  );
};

export default Category;