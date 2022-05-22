import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { Typography } from '@mui/material';

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
    <Typography sx={{ padding: '2rem 0', textAlign: 'center', color: 'white', fontWeight: 'bold', background: 'black' }} variant='h2' component='h1'>{title(pathname, search)}</Typography>
  )
};

export default Banner;
