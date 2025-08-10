import { useCallback, useState } from 'react';
import { ReservationFilter, useReservationStore } from '../store/reservation.store.reservation';
import * as adminReservationApi from '../api/reservation.api.admin.reservation';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';

export const useReservation = () => {
  const reservationFilter = useReservationStore((state) => state.reservationFilter);
  const setReservationFilter = useReservationStore((state) => state.setReservationFilter);
  const reservations = useReservationStore((state) => state.reservations);
  const initReservation = useReservationStore((state) => state.initReservation);
  const setErrorType = useErrorStore((state) => state.setErrorType);

  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async (filter?: ReservationFilter) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminReservationApi.getReservations(
        { filter: filter || reservationFilter },
      );
      initReservation(data);
    } catch (error) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, initReservation, setErrorType, reservationFilter]);

  const createReservation = useCallback(async ({
    name, phone, startTime, staffId, nailId, nailSpendMinute,
  }: {
    name: string;
    phone: string;
    startTime: string;
    staffId: string;
    nailId: string;
    nailSpendMinute: number;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminReservationApi.postReservation({
        startTime,
        endTime: new Date(new Date(startTime).getTime() + nailSpendMinute * 60000).toString(),
        phone,
        name,
        staffId,
        nailId,
      });
    } catch (error) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, setErrorType]);

  const changeReservationFilter = (filterChange: Partial<ReservationFilter>) => {
    setReservationFilter({ ...reservationFilter, ...filterChange });
  };

  return {
    reservations,
    reservationFilter,
    createReservation,
    fetchReservations,
    changeReservationFilter,
  };
};
