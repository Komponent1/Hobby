import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const Loading: React.FC<{ type: string, dep: 'login'|'load' }> = ({ type, dep }) => {
  const { loading, data, error } = useSelector((state: rootState) => state[dep]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (data) navigate('/', { replace: true });
    if (error) {
      alert('error Occured')
      navigate(-1);
    }    
  }, [loading])

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}}>
      Loading
    </div>
  )
};

export default Loading;