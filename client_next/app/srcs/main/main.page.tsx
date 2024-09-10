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
      <div key={page}>
        <Link href={pages[page].path}>
          {pages[page].title}
        </Link>
        <br />
      </div>
    ))}
  </div>
);

export default MainPage;
