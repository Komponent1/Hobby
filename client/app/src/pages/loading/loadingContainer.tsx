import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import LoadingPresenter from './loadingPresenter';

type tDep = 'signup'|'auth'|'article'|'post'
const useLoading = (dep: tDep, navigate: any) => {
  const { loading, data, error } = useSelector((state: rootState) => state[dep === 'post' ? 'article' : dep]);

  const auth = useCallback((data: any, error: number|null) => {
    if (error === 401) { /* not correct email or password */
      navigate(-1);
    } else if (error === 500) { /* server error */
      navigate(-1);
    } else {
      navigate('/', { replace: true })
    }
  }, []);
  const signup = useCallback((data: number|null, error: number|null) => {
    if (error === 401) {
      navigate(-1);
    } else if (error === 500) {
      navigate(-1);
    } else if (data === 204) {
      navigate('/', { replace: true });
    }
  }, []);
  const article = useCallback((data: any, error: number|null) => {
    if (error) {
      navigate(-1);
    } else {
      navigate(`/article?article_id=${data.article.ID}`, { replace: true });
    }
  }, []);

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
        article(data, error);
        break;
      case 'post':
        
      default:
        return;
    };
    
  }, [ loading ])
};

type Prop = { dep: tDep }
const LoadingContainer: React.FC<Prop> = ({ dep }) => {
  const navigate = useNavigate();
  useLoading(dep, navigate);

  return (
    <LoadingPresenter />
  );
};

export default LoadingContainer;
