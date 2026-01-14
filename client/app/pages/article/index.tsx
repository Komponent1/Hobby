import React from 'react';
import { getArticlePropsFromLocal } from '../../srcs/article/article.props';
import { Article } from '../../srcs/article/dto/article';
import ArticleContainer from '../../srcs/article/article.container';

type Props = {
  articles: Article[];
};
const Articles: React.FC<Props> = ({articles}) => (
  <ArticleContainer articles={articles} />
);

export default Articles;

export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}
