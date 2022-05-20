import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { getArticle } from '../../api';

const Article: React.FC = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: rootState) => state.article);
  const { article_id } = queryString(search);

  useEffect(() => {
    if (data.artcle_id !== article_id) dispatch(getArticle(article_id));
  }, []);

  return (
    <>TEST</>
  )
};

export default Article;
