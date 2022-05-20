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
        return 'BLOG'
      case '/category':
        const { category_id } = queryString.parse(search);
        return category.data.find((e: any)=> e.category_id === category_id).title
      return 
        
      case '/article':
        return article.data.title
    }
  }

  return (
    <div>{title(pathname, search)}</div>
  )
};

export default Banner;
