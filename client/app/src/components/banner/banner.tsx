import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';

const Banner: React.FC = () => {
  const { pathname, search } = useLocation();
  const { category, article } = useSelector((state: rootState) => state);

  const title = (pathname: string, search: string) => {
    switch (pathname) {
      case '/':
        const category_id = queryString.parse(search).category_id as string;
        if (category_id) return category.data?.categories.find((e: any)=> e.ID === parseInt(category_id)).name
        else return 'BLOG'
      case '/article':
        return article.data.article.title
    }
  }

  return (
    <div>{title(pathname, search)}</div>
  )
};

export default Banner;
