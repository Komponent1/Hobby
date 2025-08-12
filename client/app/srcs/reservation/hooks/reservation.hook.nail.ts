import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useNailStore } from '../store/reservation.store.nail';
import * as adminNailApi from '../api/reservation.api.admin.nail';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';
import { useAuthStore } from '../store/reservation.store.auth';
import { UnAuthorizedException } from '../util/reservation.util.exception';

export const useNail = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const nails = useNailStore((state) => state.nails);
  const initNails = useNailStore((state) => state.initNails);
  const addNail = useNailStore((state) => state.addNail);
  const deleteNail = useNailStore((state) => state.deleteNail);
  const updateNail = useNailStore((state) => state.updateNail);
  const setErrorType = useErrorStore((state) => state.setErrorType);

  const [loading, setLoading] = useState(false);

  const fetchNails = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminNailApi.getNails({accessToken});
      initNails(data);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [initNails, loading, setErrorType, accessToken, router]);

  const createNail = useCallback(async (name: string, price: number, spendMinute: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const nail = await adminNailApi.postNail({
        accessToken, name, price, spendMinute,
      });
      addNail(nail);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [addNail, loading, setErrorType, accessToken, router]);

  const deleteNailById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.deleteNail({id, accessToken});
      deleteNail(id);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [deleteNail, loading, setErrorType, accessToken, router]);

  const updateNailById = useCallback(async (id: string, name: string, price: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.patchNail({
        id, name, price, accessToken,
      });
      updateNail(id, name, price);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [updateNail, loading, setErrorType, accessToken, router]);

  return {
    nails, fetchNails, createNail, deleteNailById, updateNail, updateNailById, loading,
  };
};
