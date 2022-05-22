import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';
import { Typography } from '@mui/material';
import { TextMenuList } from '..';
import queryString from 'query-string';
import { BASENAME } from '../../env';

const Category: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const category_id = queryString.parse(search).category_id as string;
  const { data } = useSelector((state: rootState) => state.category);

  useEffect(() => {
    dispatch(getCategory(BASENAME));
  }, []);

  /* click to category */
  const onClick = (idx: number) => {
    if (idx === -1) return navigate('/');
    navigate(`/?category_id=${data?.categories[idx].id}`);
  };

  return (
    <>
      <Typography sx={{ paddingLeft: '0.5rem' }} variant='subtitle1' component='p'
        onClick={() => onClick(-1)}>
        전체보기
      </Typography>
      <TextMenuList
        select={category_id ? data?.categories.findIndex((e: any) => e.id === parseInt(category_id)) : -1}
        items={data?.categories.map((e: any, i: number) => ({
        text: e.name, onClick: (e: React.MouseEvent) => onClick(i)
      }))} />
    </>
  );
};

export default Category;