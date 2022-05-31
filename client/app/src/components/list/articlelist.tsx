import React from 'react';
import { List } from '@mui/material';
import { ArticleItem } from '..';

type Prop = {
  articles: any[]
  onClickArticle: (idx:number) => void
}
const Articlelist: React.FC<Prop> = ({ articles, onClickArticle }) => {
  return (
    <List>
      {articles.map((article, i) => (
        <ArticleItem key={i}
          article={article} onClick={() => onClickArticle(i)}/>
      ))}
    </List>
  )
};

export default Articlelist;
