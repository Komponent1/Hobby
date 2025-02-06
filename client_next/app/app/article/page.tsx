'use client';

import React from 'react';
import articleJson from './__posts__/articles.json';
import ArticlePage from "./article.page";
import { Article } from "./dto/article";

const Page: React.FC = () => {
  const articleList: Article[] = Object.values(articleJson).reverse();

  return (
    <ArticlePage articles={articleList} />
  );
};
export default Page;
