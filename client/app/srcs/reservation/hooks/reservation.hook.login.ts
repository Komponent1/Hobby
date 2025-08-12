/* eslint-disable no-useless-return */
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import * as api from '../api/reservation.api.auth';
import {ErrorType, useErrorStore} from '../store/reservation.store.error';

export const useLogin = () => {
  const [uid, setUid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setErrorType = useErrorStore((state) => state.setErrorType);
  const router = useRouter();

  const login = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!uid || !password) return;

      const data = await api.postLogin(uid, password);
      if (!data.access_token) {
        setErrorType(ErrorType.Unknown);
        return;
      }
      localStorage.setItem('accessToken', data.access_token);
      router.push('/reservation/main');
    } catch (error) {
      setErrorType(ErrorType.Unknown);
    }
  }, [uid, password, setErrorType, router]);

  return {
    uid,
    setUid,
    password,
    setPassword,
    login,
  };
};
