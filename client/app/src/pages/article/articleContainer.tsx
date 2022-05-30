import React, { useEffect } from 'react';
import { useLocation, useNavigate, NavigateFunction, Location } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { deleteArticle, getArticle } from '../../store/article';
import ArticlePresenter from './articlePresenter';
import { BASENAME } from '../../env';
import { useLoading } from '../../hooks';

const usePagemove = (article_id: string, navigate: NavigateFunction, location: Location, dispatch: any) => {
  const { loading } = useLoading('article');
  const { data } = useSelector((state: rootState) => state.auth);

  const openEditor = () => navigate(`/post?article_id=${article_id}`);
  const openDel = () => {
    if (!data) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }
    
    dispatch(deleteArticle(
      article_id, data.access_token, BASENAME,
      loading
    ));
  }

  return { openEditor, openDel };
}

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, location, navigate } = useLoading('article');
  const { article_id } = queryString.parse(location.search) as { article_id: string };
  const { data } = useSelector((state: rootState) => state.article);
  const { openEditor, openDel } = usePagemove(article_id, navigate, location, dispatch);
  
  useEffect(() => {
    if (data?.article.id !== parseInt(article_id)) {
      dispatch(getArticle(article_id, loading));
    }
  }, []);

  return (
    <ArticlePresenter
      content={data?.article.content}
      openEditor={openEditor}
      openDel={openDel}
    />
  )
};

export default Article;
