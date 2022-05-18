import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import LoadingPresenter from './loadingPresenter';

const useLoading = (dep: 'signup', navigate: any) => {
  const { loading, data, error } = useSelector((state: rootState) => state[dep]);
  
  const signup = useCallback((data: number|null, error: number|null) => {
    if (error === 401) {
      navigate(-1);
    } else if (error === 500) {
      navigate(-1);
    } else if (data === 204) {
      navigate('/main', { replace: true });
    }
  }, []);

  useEffect(() => {
    
    if (loading) return;
    switch(dep) {
      case 'signup':
        signup(data, error);
        break;
      default:
        return;
    };
    
  }, [ loading ])
};

type Prop = { dep: 'signup' }
const LoadingContainer: React.FC<Prop> = ({ dep }) => {
  const navigate = useNavigate();
  useLoading(dep, navigate);

  return (
    <LoadingPresenter />
  );
};

export default LoadingContainer;
