import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { Typography, Avatar } from '@mui/material';
import { BLOGNAME, BLOGEXPLAIN, LOGO } from '../../env';
import * as style from './style';

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

  return (
    <style.div>
      <style.textbox width={window.screen.width}>
        <Typography sx={{ fontWeight: 'bold' }} variant='h3' component='h1'>{title(pathname)}</Typography>
        <Typography variant='h5' component='h5'>{category_id || article_id ? '' : BLOGEXPLAIN}</Typography>
        <Avatar alt='owner' src={LOGO} sx={style.img}/>
      </style.textbox>
    </style.div>
  )
};

export default Banner;
