import React from 'react';
import {Article as tArticle, User} from 'Data';
import {getArticlePropsFromLocal} from '../../srcs/pages/article/article.local.props';
import ArticlePage from '../../srcs/pages/article/article.page';

type ArticleProps = {
  article: tArticle;
  content: string;
  user: User;
  login: string;
  date: string;
};
function Article(props: ArticleProps) {
  return (
    <ArticlePage {...props} />
  );
}
export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}

export default Article;
