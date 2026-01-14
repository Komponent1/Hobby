import {ThemeProvider} from '@seolim/designsystem';
import React from 'react';
import ArticlePage from './article.page';
import {Article} from './dto/article';

const ArticleContainer: React.FC<{articles: Article[]}> = ({articles}) => (
  <ThemeProvider>
    <ArticlePage articles={articles} />
  </ThemeProvider>
);
export default ArticleContainer;
