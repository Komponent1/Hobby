import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import { getCategory } from '../../store/category';
import CategoryPresenter from './categoryPresenter';
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

  const select = () => {
    if (category_id) {
      if (category.data) {
        return category.data.categories.findIndex((e: any) => e.id === parseInt(category_id)) + 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  
  return { data: category.data, select }
};
const useArticles = (data: any) => {
  const navigate = useNavigate();

  const onClick = (idx: number) => {
    if (idx === 0) {
      navigate('/');
    } else {
      navigate(`/?category_id=${data?.categories[idx - 1].id}`);
    }
  };

  return { onClick };
}

const Category: React.FC = () => {
  const { data, select } = useCategory();
  const { onClick } = useArticles(data);
  
  const items = () => {
    if (data) {
      return [
        { text: '전체보기', onClick: (e: React.MouseEvent) => onClick(0) },
        ...data.categories.map((e: any, i: number) => ({
            text: e.name, onClick: (e: React.MouseEvent) => onClick(i + 1)
            })
        )]
    } else {
      return [{ text: '전체보기', onClick: (e: React.MouseEvent) => onClick(0) }];
    }
  }

  /* click to category */
  return (  
    <CategoryPresenter
      select={select()}
      items={items()} />
  );
};

export default Category;