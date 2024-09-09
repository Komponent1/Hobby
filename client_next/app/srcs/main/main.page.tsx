import React from 'react';
import Link from 'next/link';
import pages from '../page.config.json';

type PageConfig = {
  [key: string]: {
    title: string;
    path: string;
    children?: {path: string};
  }
};
const MainPage = () => (
  <div>
    {Object.keys(pages as PageConfig).map((page) => (
      <>
        <Link key={page} href={pages[page].path}>
          {pages[page].title}
        </Link>
        <br />
      </>
    ))}
  </div>
);

export default MainPage;
