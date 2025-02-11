import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleItemPresenter from './articleItemPresenter';
import { date2string } from '../../lib';
import { Article } from 'Data';

type Prop = {
  article: any,
  onClick: (e: React.MouseEvent) => void
};
const useOnClick = (article: Article) => {
  const navigate = useNavigate();

  const move2Article = () => {
    navigate(`/article?article_id=${article.id}`);
  }

  return move2Article;
};
const useHoverStyle = () => {
  const [ hover, setHover ] = useState<boolean>(false);
  const checkHover = {
    onMouseOver: () => setHover(true),
    onMouseOut: () => setHover(false)
  }

  return { hover, checkHover };
};
const ArticleItemContainer: React.FC<Prop> = ({ article, onClick }) => {
  const move2Article = useOnClick(article);
  const { hover, checkHover } = useHoverStyle();

  return (
    <ArticleItemPresenter
      hover={hover} checkHover={checkHover}
      title={article.title}
      date={date2string(article.publish_date)}
      move2Article={move2Article}
    />
  )
};

export default ArticleItemContainer;
