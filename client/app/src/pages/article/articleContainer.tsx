import React, { useEffect } from 'react';
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { rootState } from '../../store';
import { getArticle } from '../../store/article';
import { deleteArticle } from '../../store/articles';
import ArticlePresenter from './articlePresenter';
import { EMAIL } from '../../env';
import { useLoading } from '../../hooks';
import { Loading } from '../../components';

const usePagemove = (article_id: string, navigate: NavigateFunction, location: Location, dispatch: any) => {
  const { loading } = useLoading('articles', '/');
  const { data } = useSelector((state: rootState) => state.auth);

  const openEditor = () => navigate(`/post?article_id=${article_id}`);
  
  const openDel = () => {
    if (!data) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }

    dispatch(deleteArticle(
      article_id, data.access_token, EMAIL,
      loading
    ));
  }

  return { openEditor, openDel };
}

const Article: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { article_id } = queryString.parse(location.search) as { article_id: string };
  const { loading, data } = useSelector((state: rootState) => state.article);
  const { openEditor, openDel } = usePagemove(article_id, navigate, location, dispatch);
  
  useEffect(() => {
    dispatch(getArticle(article_id));
  }, [ article_id ]);

  if (loading) return <Loading />
  return (
    <ArticlePresenter
      content={data?.article.content}
      openEditor={openEditor}
      openDel={openDel}
    />
  )
};

export default Article;
