import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Category, Header, Banner } from '../../components';
import ArticlesBoard from '../../components/articlesboard/articlesborad';
import { rootState } from '../../store';

const Main: React.FC = () => {
  const { search } = useLocation();

  const getName = useCallback(() => {
    return 'category_name with query'
  }, [ search ]);
  const getCategoryId = useCallback(()=> {
    return 'category_id with query'
  }, [ search ]);

  return (
    <div>
      <Header />
      <Banner title={getName()}/>
      <Category/>
      <ArticlesBoard category_id={getCategoryId()}/>
    </div>
  )
};

export default Main