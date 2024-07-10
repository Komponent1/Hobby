import React from 'react';
import { Article } from 'Data';
import Link from 'next/link';
import { getArticlePropsFromLocal } from '../../srcs/pages/articles/articles.local.props';

type Props = {
  articles: Article[];
};
const Articles: React.FC<Props> = ({articles}) => (
  <div>
    <h1>Articles</h1>
    {articles.map((article) => (
      <div key={article.id}>
        <Link href={`/articles/${article.id}`}>{article.title}</Link>
      </div>
    ))}
  </div>
);

export default Articles;

export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}
