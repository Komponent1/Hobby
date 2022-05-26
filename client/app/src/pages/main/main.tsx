import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Category,  Banner, ArticlesBoard } from '../../components';
import queryString from 'query-string';
import * as style from './style';

const Main: React.FC = () => {
  const { search } = useLocation();
  const category_id = queryString.parse(search).category_id as string|null|undefined;
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <>
      <style.head>
        <Banner />
      </style.head>
      <style.div>
        <style.section>
          <ArticlesBoard category_id={category_id}/>
          <style.menu open={open}>
            <Category/>
          </style.menu>
          <style.menuOpen onClick={() => setOpen(!open)}>{open ? '->' : '<-'}</style.menuOpen>
        </style.section>
      </style.div>
    </>
  )
};

export default Main