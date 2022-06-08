import React from 'react';
import { Category,  Banner, ArticlesBoard, Article } from '../../components';
import * as style from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar } from '@mui/material';

type Prop = {
  open: boolean;
  setOpen: (open: boolean) => void
  pathname: string
}
const Main: React.FC<Prop> = ({ open, setOpen, pathname }) => {
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
            <Avatar sx={style.logo}>
              <ArrowBackIcon />
            </Avatar>
          </style.menuOpen>
        </style.section>
      </style.div>
    </>
  )
};

export default Main