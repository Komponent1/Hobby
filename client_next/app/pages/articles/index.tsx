import React from 'react';
import { getArticlePropsFromLocal } from '../../srcs/articles/article.props';
import ArticlesPage from '../../srcs/articles/articles.page';
import { Article } from '../../srcs/articles/dto/article';

type Props = {
  articles: Article[];
};
const Articles: React.FC<Props> = ({articles}) => (
  <ArticlesPage articles={articles} />
);

export default Articles;

export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}
