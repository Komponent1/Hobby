import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { Typography } from '@mui/material';
import { BLOGNAME, BLOGEXPLAIN } from '../../env';

const Banner: React.FC = () => {
  const { pathname, search } = useLocation();
  const { category, article } = useSelector((state: rootState) => state);
  const category_id = queryString.parse(search).category_id as string;
  const article_id = queryString.parse(search).article_id as string;

  const title = (pathname: string) => {
    switch (pathname) {
      case '/':
        if (category_id) return category.data?.categories.find((e: any)=> e.id === parseInt(category_id)).name
        else return BLOGNAME;
      case '/article':
        return article.data?.article.title
    }
  }

  console.log(article_id)
  return (
    <div style={{ background: article_id ? 'white' : 'black' }}>
      <Typography sx={{ padding: '2rem', color: article_id ? 'black' : 'white', fontWeight: 'bold' }} variant='h3' component='h1'>{title(pathname)}</Typography>
      {category_id || article_id ? null : <Typography sx={{ color: 'white', padding: '2rem' }} variant='h5' component='h5'>{BLOGEXPLAIN}</Typography>}
    </div>
  )
};

export default Banner;
