import React from 'react';
import Link from 'next/link';
import {Div} from './main.style';

const MainPage = () => (
  <Div>
    <Link href="/articles">
      articles
    </Link>
    <Link href="/informations">
      informations
    </Link>
    <Link href="/game">
      game
    </Link>
  </Div>
);

export default MainPage;
