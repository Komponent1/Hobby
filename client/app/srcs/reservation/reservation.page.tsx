/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ReservationPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (!window) return;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/reservation/main');
    } else {
      router.push('/reservation/login');
    }
  }, []);
  return null;
};

export default ReservationPage;
