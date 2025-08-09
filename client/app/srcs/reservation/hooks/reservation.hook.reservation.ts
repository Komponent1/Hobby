import { useCallback, useState } from 'react';
import { useReservationStore } from '../store/reservation.store.reservation';
import * as adminReservationApi from '../api/reservation.api.admin.reservation';

export const useReservation = () => {
  const filter = useReservationStore((state) => state.reservationFilter);
  const reservations = useReservationStore((state) => state.reservations);
  const initReservation = useReservationStore((state) => state.initReservation);

  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminReservationApi.getReservations({ filter });
      initReservation(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, filter, initReservation]);

  const createReservation = useCallback(async ({
    name, phone, date, staffId, nailId,
  }: {
    name: string;
    phone: string;
    date: string;
    staffId: string;
    nailId: string;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminReservationApi.postReservation({
        date,
        phone,
        name,
        staffId,
        nailId,
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return {
    reservations,
    createReservation,
    fetchReservations,
  };
};
