import {useCallback} from 'react';
import { useRouter } from 'next/router';
import {useAuthStore} from '../store/reservation.store.auth';

export const useAuth = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const checkTokenInStorage: () => string | null = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      return token;
    }
    setAccessToken('');
    return null;
  }, [setAccessToken]);
  const saveTokenToStorage = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setAccessToken('');
  }, [setAccessToken]);
  const clearTokenFromStorage = useCallback(() => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
  }, [setAccessToken]);
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
    router.push('/reservation/login');
  }, [setAccessToken, router]);
  return {
    accessToken,
    setAccessToken,
    checkTokenInStorage,
    saveTokenToStorage,
    clearTokenFromStorage,
    logout,
  };
};
