import { useNavigate, useLocation } from 'react-router-dom';

const useLoading = (dep: string, prevurl?: string|Function) => {
  const navigate = useNavigate();
  const location = useLocation();

  const loading = (url: string|Function) => {
    navigate(
      '/loading',
      {
        state: {
          backgroundLocation: location,
          dep,
          url: prevurl ? prevurl : url
      }
    });
  }

  return {
    loading: loading,
    navigate, location
  }
};

export default useLoading;
