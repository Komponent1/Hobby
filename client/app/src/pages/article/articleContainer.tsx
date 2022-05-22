import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { getArticle } from '../../store/article';
import ArticlePresenter from './articlePresenter';

const Article: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: rootState) => state.article);
  const { article_id } = queryString.parse(location.search) as { article_id: string };
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.article.id !== parseInt(article_id)) dispatch(getArticle(parseInt(article_id), navigate, location, 'article'));
  }, []);

  return (
    <ArticlePresenter content={data?.article.content}/>
  )
};

export default Article;
