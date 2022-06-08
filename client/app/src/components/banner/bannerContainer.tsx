import React from 'react';
import BannerPresenter from './bannerPresenter';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { BLOGEXPLAIN, BLOGNAME } from '../../env';
import { rootState } from '../../store';


const BannerContainer: React.FC = () => {
  const { pathname, search } = useLocation();
  const { category, article } = useSelector((state: rootState) => state);
  const category_id = queryString.parse(search).category_id as string;
  const article_id = queryString.parse(search).article_id as string;

  const title = (() => {
    switch (pathname) {
      case '/':
        if (category_id) return category.data?.categories.find((e: any)=> e.id === parseInt(category_id)).name
        else return BLOGNAME;
      case '/article':
        return article.data?.article.title
    }
  })();
  const explain = (() => {
    if (article_id || category_id) return ''
    else return BLOGEXPLAIN;
  })();

  return (
    <BannerPresenter
      title={title}
      explain={explain}/>
  )
};

export default BannerContainer;
