import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ReservationFilter, useReservationStore } from '../store/reservation.store.reservation';
import * as adminReservationApi from '../api/reservation.api.admin.reservation';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';
import { Reservation } from '../dto/reservation.dto.reservation';
import { useAuthStore } from '../store/reservation.store.auth';
import { UnAuthorizedException } from '../util/reservation.util.exception';

export const useReservation = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const reservationFilter = useReservationStore((state) => state.reservationFilter);
  const setReservationFilter = useReservationStore((state) => state.setReservationFilter);
  const reservations = useReservationStore((state) => state.reservations);
  const initReservation = useReservationStore((state) => state.initReservation);
  const setErrorType = useErrorStore((state) => state.setErrorType);

  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async ({filter, token}:{
    filter?: ReservationFilter;
    token?: string;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminReservationApi.getReservations(
        { accessToken: token || accessToken, filter: filter || reservationFilter },
      );
      initReservation(data);
    } catch (error) {
      if (error instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, initReservation, setErrorType, reservationFilter, accessToken, router]);

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
        accessToken,
        startTime,
        endTime: new Date(new Date(startTime).getTime() + nailSpendMinute * 60000).toString(),
        phone,
        name,
        staffId,
        nailId,
      });
    } catch (error) {
      if (error instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, setErrorType, accessToken, router]);

  const changeReservationFilter = useCallback((filterChange: Partial<ReservationFilter>) => {
    const changedFilter = { ...reservationFilter, ...filterChange };
    setReservationFilter(changedFilter);
    return changedFilter;
  }, [reservationFilter, setReservationFilter]);

  const deleteReservationById = useCallback(async (reservationId: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminReservationApi.deleteReservation({
        accessToken,
        reservationId,
      });
    } catch (error) {
      if (error instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, setErrorType, accessToken, router]);

  const updateReservation = useCallback(async (
    reservationId: string,
    updateData: Partial<Reservation>,
  ) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminReservationApi.patchReservation({
        accessToken,
        reservationId,
        updateData,
      });
    } catch (error) {
      if (error instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [loading, setErrorType, accessToken, router]);

  return {
    reservations,
    reservationFilter,
    createReservation,
    fetchReservations,
    changeReservationFilter,
    deleteReservationById,
    updateReservation,
  };
};
