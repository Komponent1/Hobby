import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const Loading: React.FC<{ type: string, dep: 'login'|'signup' }> = ({ type, dep }) => {
  const state = useSelector((state: rootState) => state[dep]);
  const navigate = useNavigate();

  const next = useCallback(() => {
    const { loading, data, error } = state;  
    if (loading) return;
    if (data) navigate('/', { replace: true });
    if (error) {
      alert('error Occured')
      navigate(-1);
    }    
  }, [ state, navigate ])

  useEffect(() => {
    next()
  }, [next])

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}}>
      Loading
    </div>
  )
};

export default Loading;