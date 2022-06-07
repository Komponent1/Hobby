import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import LoadingPresenter from './loadingPresenter';

type tDep = 'signup'|'auth'|'article'|'articles'|'category'|'postarticle'|'refresh'|'deletearticle'
type state = 'signup'|'auth'|'article'|'articles'|'category'
const next = (url: string|Function, dep?: string) => {
  if (typeof url === 'string') return url;
  if (dep) return url(dep);
}
const dependency = (dep: tDep): state => {
  switch (dep) {
    case 'postarticle':
      return 'article';
    case 'refresh':
      return 'auth'
    case 'deletearticle':
      return 'article';
    default:
      return dep;
  }
}
const useAllload = () => {
  const { signup, auth, articles, article, category } = useSelector((state: rootState) => state);

  return { 
    loading: signup.loading || auth.loading || articles.loading || article.loading || category.loading
  }
}
const useNext = (dep: tDep, url: string) => {  
  const navigate = useNavigate();
  const { loading } = useAllload();
  const { data, error } = useSelector((state: rootState) => state[dependency(dep)]);

  const auth = useCallback((data: any, error: number|null) => {
    if (error === 400) {
      alert('요청에 문제가 있습니다.');
      navigate(-1);
    } else if (error === 403) {
      alert('존재하지 않는 유저입니다.');
      navigate(-1);
    } else if (error === 412) {
      alert('비밀번호가 일치하지 않습니다.');
      navigate(-1);
    } else if (error === 500) {
      alert('서버 오류가 있습니다. 나중에 다시 시도해주세요');
      navigate(-1);
    } else {
      navigate(url, { replace: true });
    }
  }, [ dep ]);
  const refresh = useCallback((data: any, error: number|null) => {
    if (error === 400) {
      alert('요청에 문제가 있습니다.');
      navigate(-1);
    } else if (error === 403) {
      alert('유효기간이 만료되었습니다. 재로그인이 필요합니다.');
      navigate('/login', { replace: true });
    } else if (error === 500) {
      alert('서버 오류가 있습니다. 나중에 다시 시도해주세요');
      navigate(-1);
    } else {
      navigate(url, { replace: true });
    }
  }, [ dep ]);
  const signup = useCallback((data: number|null, error: number|null) => {
    if (error === 400) {
      alert('요청에 문제가 있습니다.');
      navigate(-1);
    } else if (error === 412) {
      alert('이미 존재하는 유저입니다');
      navigate(-1);
    } else if (error === 500) {
      alert('서버 오류가 있습니다. 나중에 다시 시도해주세요');
      navigate(-1);
    } else {
      navigate(url, { replace: true });
    }
  }, [ dep ]);
  const article = useCallback((data: any, error: number|null, dep: tDep) => {
    if (error === 401 || error === 403) {
      alert('로그아웃 되었습니다. 로그인이 필요합니다');
      navigate('/login');
    } else if (error === 500) {
      alert('서버에 문제가 있습니다, 다시 시도해주세요');
      navigate(-1);
    } else if (data) {
      if (dep === 'postarticle') {
        window.localStorage.removeItem(`blog_post_temp_save`);
        navigate(next(`/article?article_id=${data.article.id}`), { replace: true });
      } else {
        navigate(next(url), { replace: true });
      }
    } else {
      navigate(url, { replace: true });
    }
  }, [ dep ]);
  const category = useCallback((data: any, error: number|null) => {
    if (error === 500) {
      alert('서버에 문제가 있습니다, 다시 시도해주세요');
      navigate(-1);
    } else if (error === 401 || error === 403) {
      alert('로그아웃 되었습니다. 로그인이 필요합니다');
      navigate('/login');
    } else if (error === 412) {
      alert('이미 존재하는 카테고리입니다.');
      navigate(-1);
    } else {
      navigate(url);
    }
  }, [ dep ])

  useEffect(() => {
    if (loading) return;
    switch(dep) {
      case 'signup':
        signup(data, error);
        break;
      case 'auth':
        auth(data, error);
        break;
      case 'refresh':
        refresh(data, error);
        break;
      case 'article':
        article(data, error, dep);
        break;
      case'postarticle':
        article(data, error, dep);
        break;
      case 'deletearticle':
        article(data, error, dep);
        break;
      case 'category':
        category(data, error);
        break;
      default:
        return;
    };
  }, [ loading ])
};

type Prop = {
  dep: tDep
  url: string
}
const LoadingContainer: React.FC<Prop> = ({ dep, url }) => {
  useNext(dep, url);

  return (
    <LoadingPresenter />
  );
};

export default LoadingContainer;
