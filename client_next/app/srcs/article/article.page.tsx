import React from 'react';
import Link from 'next/link';
import { Article } from './dto/article';

type Props = {
  articles: Article[];
};
const ArticlePage: React.FC<Props> = ({ articles }) => (
  <div>
    <h1>Articles</h1>
    {articles.map((article) => (
      <div key={article.id}>
        <Link href={`/article/${article.id}`}>{article.title}</Link>
      </div>
    ))}
  </div>
);

export default ArticlePage;
