import React from 'react';
import ArticlesPidPage from '../../srcs/article/article.pid.page';
import { getArticleProps, getArticlesListPath } from '../../srcs/article/article.pid.props';

type Props = {
  content: string;
};
const ArticlesPid: React.FC<Props> = ({content}) => (
  <ArticlesPidPage content={content} />
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
