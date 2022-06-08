import React, { useState } from 'react';
import ArticleItemPresenter from './articleItemPresenter';

const date2string = (datestring: string) => {
  const date = new Date(datestring);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

type Prop = {
  article: any,
  onClick: (e: React.MouseEvent) => void
};
const ArticleItemContainer: React.FC<Prop> = ({ article, onClick }) => {
  const [ hover, setHover ] = useState<boolean>(false);
  const onChange = {
    onMouseOver: () => setHover(true),
    onMouseOut: () => setHover(false)
  }

  return (
    <ArticleItemPresenter
      hover={hover} setHover={onChange}
      title={article.title}
      date={date2string(article.publish_date)}
      onClick={onClick}
    />
  )
};

export default ArticleItemContainer;
