import React from 'react';
import { getArticleProps, getArticlesListPath } from '../../srcs/pages/articles/articles.pid.local..props';

type Props = {
  article: string;
};
const Article: React.FC<Props> = ({article}) => (
  <div>
    <h1>Article</h1>
    <div dangerouslySetInnerHTML={{__html: article}} />
  </div>
);

export function getStaticPaths() {
  return getArticlesListPath();
}
export async function getStaticProps({params}: {params: {pid: string}}) {
  const {pid} = params;
  const props = await getArticleProps({pid});
  return props;
}

export default Article;
