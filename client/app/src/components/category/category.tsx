import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';
import { TextMenuList } from '..';
import queryString from 'query-string';
import { EMAIL } from '../../env';

const useCategory = () => {
  const { category, article } = useSelector((state: rootState) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const { category_id, article_id } = queryString.parse(location.search) as { category_id?: string, article_id?: string }

  useEffect(() => {
    dispatch(getCategory(EMAIL));
  }, [ category_id, article_id ]);
  
  return { data: category.data, category_id, article_id }
};
const useArticles = (data: any) => {
  const navigate = useNavigate();

  const onClick = (idx: number) => {
    if (idx === -1) {
      navigate('/');
    } else {
      navigate(`/?category_id=${data?.categories[idx].id}`);
    }
  };

  return { onClick };
}

const Category: React.FC = () => {
  const { data, category_id, article_id } = useCategory();
  const { onClick } = useArticles(data);

  const chooseSelect = () => {
    if (category_id) {
      return data ? data.categories.findIndex((e: any) => e.id === parseInt(category_id)) : -1
    } else if (article_id) {
      return
    } else {
      return -1;
    }
  }

  /* click to category */
  return (  
    <TextMenuList
      onClick={onClick}
      select={category_id ? data?.categories.findIndex((e: any) => e.id === parseInt(category_id)) : -1}
      items={data?.categories.map((e: any, i: number) => ({
      text: e.name, onClick: (e: React.MouseEvent) => onClick(i)
    }))} />
  );
};

export default Category;