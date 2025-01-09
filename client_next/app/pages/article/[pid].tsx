import React from 'react';
import ArticlesPidPage from '../../srcs/article/article.pid.page';
import { getArticleProps, getArticlesListPath } from '../../srcs/article/article.pid.props';
import { Article } from "../../srcs/article/dto/article";

type Props = {
  content: string;
  article: Article;
};
const ArticlesPid: React.FC<Props> = ({content, article}) => (
  <ArticlesPidPage content={content} article={article} />
);

export function getStaticPaths() {
  return getArticlesListPath();
}
export async function getStaticProps({params}: {params: {pid: string}}) {
  const {pid} = params;
  const props = await getArticleProps({pid});
  return props;
}

export default ArticlesPid;
