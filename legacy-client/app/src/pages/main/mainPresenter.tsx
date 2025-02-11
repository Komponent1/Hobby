import React from 'react';
import { Category,  Banner, ArticlesBoard, Article, Sidemenu } from '../../components';
import * as style from './style';

type Prop = {
  pathname: string
}
const Main: React.FC<Prop> = ({ pathname }) => {
  return (
    <>
      <style.head>
        <Banner />
      </style.head>
      <style.div>
        <style.section>
          <style.article>
            {
              pathname === '/article' ?
                <Article />:<ArticlesBoard/>
            }
          </style.article>
          <Sidemenu>
            <Category/>
          </Sidemenu>
        </style.section>
      </style.div>
    </>
  )
};

export default Main