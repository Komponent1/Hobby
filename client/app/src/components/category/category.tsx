import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';

const Category: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state: rootState) => state.category);

  useEffect(() => {
    dispatch(getCategory('email'));
  }, []);

  /* click to category */
  const onClick = (idx: number) => {
    console.log(data.categories[idx])
    navigate(`?category_id=${data.categories[idx].ID}`);
  };

  return (
    <ul>
      {data?.categories.map((e: any, i: number) => (
        <li key={i} onClick={() => onClick(i)}>{e.name}</li>
      ))}
    </ul>
  );
};

export default Category;