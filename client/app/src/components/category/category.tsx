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
    if (idx === -1) return navigate('/');
    navigate(`?category_id=${data.categories[idx].ID}`);
  };

  return (
    <ul>
      <li onClick={() => onClick(-1)}>전체보기</li>
      {data?.categories.map((e: any, i: number) => (
        <li key={i} onClick={() => onClick(i)}>{e.name}</li>
      ))}
    </ul>
  );
};

export default Category;