import React from 'react';
import { List } from '@mui/material';
import { ArticleItem } from '..';

type Prop = {
  articles: any[]
  onClickArticle: (idx:number) => void
}
const ArticleboardPresenter = React.forwardRef<HTMLDivElement, Prop>(({ articles, onClickArticle }, ref) => {
  return (
    <List>
      {articles.map((article, i) => (
        <ArticleItem key={i}
          article={article} onClick={() => onClickArticle(i)}/>
      ))}
      <div ref={ref} />
    </List>
  )
});

export default ArticleboardPresenter;