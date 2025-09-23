/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './reservation.hook.auth';
import { useStaff } from './reservatio.hook.staff';
import { useProduct } from './reservation.hook.product';
import { useReservation } from './reservation.hook.reservation';

export const useInitEffect = () => {
  const { checkTokenInStorage } = useAuth();
  const {fetchStaffs} = useStaff();
  const {fetchProducts} = useProduct();
  const {fetchReservations} = useReservation();

  const router = useRouter();

  useEffect(() => {
    const token = checkTokenInStorage();
    if (!token) {
      router.push('/login');
      return;
    }
    fetchStaffs(token);
    fetchProducts(token);
    fetchReservations({token});
  }, []);
};
