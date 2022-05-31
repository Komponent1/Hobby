import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';
import { TextMenuList } from '..';
import queryString from 'query-string';
import { EMAIL } from '../../env';
import { useLoading } from '../../hooks';
import { getArticles } from '../../store/articles';

const useCategory = () => {
  const { data } = useSelector((state: rootState) => state.category);
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useLoading('category', location.pathname + location.search);
  const category_id = queryString.parse(location.search).category_id as string;

  useEffect(() => {
    dispatch(getCategory(EMAIL, loading));
  }, []);

  return { data, category_id }
};
const useArticles = (data: any) => {
  const { loading, navigate } = useLoading('articles');
  const dispatch = useDispatch();

  const onClick = (idx: number) => {
    if (idx === -1) {
      navigate('/');
      // dispatch(getArticles(EMAIL, 0, 6, undefined, loading));
    } else {
      navigate(`/?category_id=${data?.categories[idx].id}`);
      // dispatch(getArticles(EMAIL, 0, 6, String(data?.categories[idx].id), loading));
    }
  };

  return { onClick };
}

const Category: React.FC = () => {
  const { data, category_id } = useCategory();
  const { onClick } = useArticles(data);

  /* click to category */
  return (
    <>
      <TextMenuList
        onClick={onClick}
        select={category_id ? data?.categories.findIndex((e: any) => e.id === parseInt(category_id)) : -1}
        items={data?.categories.map((e: any, i: number) => ({
        text: e.name, onClick: (e: React.MouseEvent) => onClick(i)
      }))} />
    </>
  );
};

export default Category;