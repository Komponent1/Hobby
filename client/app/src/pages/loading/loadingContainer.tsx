import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import LoadingPresenter from './loadingPresenter';

type tDep = 'signup'|'auth'|'article'|'articles'|'category'|'postarticle'
type state = 'signup'|'auth'|'article'|'articles'|'category'
const next = (url: string|Function, dep?: string) => {
  if (typeof url === 'string') return url;
  if (dep) return url(dep);
}
const dependency = (dep: tDep): state => {
  switch (dep) {
    case 'postarticle':
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
    if (error === 401) { /* not correct email or password */
      alert('이메일이나 비밀번호가 잘못되었습니다');
      navigate(-1);
    } else if (error === 500) { /* server error */
      navigate(-1);
    } else {
      navigate(next(url), { replace: true });
    }
  }, [ dep ]);
  const signup = useCallback((data: number|null, error: number|null) => {
    if (error === 401) {
      alert('이미 존재하는 유저입니다');
      navigate(-1);
    } else if (error === 500) {
      navigate(-1);
    } else if (data === 204) {
      navigate(next(url), { replace: true });
    }
  }, [ dep ]);
  const article = useCallback((data: any, error: number|null, dep: tDep) => {
    if (error === 401) {
      alert('로그아웃 되었습니다. 로그인이 필요합니다');
      navigate('/login');
    } else if (error === 500) {
      alert('서버에 문제가 있습니다, 다시 시도해주세요');
      navigate(-1);
    } else if (data) {
      if (dep === 'postarticle') {
        navigate(next(`/article?article_id=${data.article.id}`), { replace: true });
      } else {
        navigate(next(url), { replace: true });
      }
    } else {
      navigate(next(url), { replace: true });
    }
  }, [ dep ]);
  const articles = useCallback((data: any, error: number|null) => {
    if (error) {
      navigate(-1);
    } else if (data) {
      navigate(next(url), { replace: true })
    }
  }, [ dep ]);
  const category = useCallback((data: any, error: number|null) => {
    if (error === 401) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else if(error === 501) {
      alert('카테고리에 게시글이 있습니다. 게시글 삭제 후 시도해주세요');
      navigate(-1);
    }else if (error === 500) {
      alert('서버 에러, 나중에 다시 시도해주세요');
      navigate(-1);
    } else if (data) {
      navigate(next(url), { replace: true })
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
      case 'article':
        article(data, error, dep);
        break;
      case'postarticle':
        article(data, error, dep);
        break;
      case 'articles':
        articles(data, error);
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
