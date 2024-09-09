/* eslint-disable react/no-danger */
import React from 'react';
import { Article } from './dto/article';
import * as s from './articles.style';

type Props = {
  article: Article;
  content: string;
};
const ArticlesPidPage: React.FC<Props> = ({article, content}) => (
  <div style={s.layout}>
    <h1 style={s.title}>{article.title}</h1>
    <p style={s.p}>{article.date}</p>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);
export default ArticlesPidPage;
