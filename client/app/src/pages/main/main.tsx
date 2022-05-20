import React from 'react';
import { useLocation } from 'react-router-dom'
import { Category, Header, Banner, Editor } from '../../components';
import ArticlesBoard from '../../components/articlesboard/articlesborad';
import queryString from 'query-string';

const Main: React.FC = () => {
  const { search } = useLocation();
  const category_id = queryString.parse(search).category_id as string|null|undefined;

  return (
    <div>
      <Header />
      <Banner/>
      <Category/>
      <ArticlesBoard category_id={category_id}/>
      <Editor />
    </div>
  )
};

export default Main