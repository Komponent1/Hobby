import React, { useState } from 'react';
import { Category,  Banner, ArticlesBoard, Article } from '../../components';
import { useLocation } from 'react-router-dom';
import * as style from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar } from '@mui/material';

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <>
      <style.head>
        <Banner />
      </style.head>
      <style.div>
        <style.section>
          <style.article width={window.screen.width}>
            {
              pathname === '/article' ?
                <Article /> :<ArticlesBoard/>
            }
          </style.article>
          <style.menu open={open}>
            <Category/>
          </style.menu>
          <style.menuOpen open={open} onClick={() => setOpen(!open)}>
            <Avatar sx={{
              borderRadius: '4rem 0 0 4rem',
              width: '1.5rem',
              height: '3rem',
              background: 'white',
              color: 'black',
              boxShadow: '-2px 0 2px 1px grey'}}>
              <ArrowBackIcon />
            </Avatar>
          </style.menuOpen>
        </style.section>
      </style.div>
    </>
  )
};

export default Main