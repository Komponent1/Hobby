import { useCallback, useState } from 'react';
import { useNailStore } from '../store/reservation.store.nail';
import * as adminNailApi from '../api/reservation.api.admin.nail';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';
import { useAuthStore } from '../store/reservation.store.auth';

export const useNail = () => {
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
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [initNails, loading, setErrorType, accessToken]);

  const createNail = useCallback(async (name: string, price: number, spendMinute: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const nail = await adminNailApi.postNail({
        accessToken, name, price, spendMinute,
      });
      addNail(nail);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [addNail, loading, setErrorType, accessToken]);

  const deleteNailById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.deleteNail({id, accessToken});
      deleteNail(id);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [deleteNail, loading, setErrorType, accessToken]);

  const updateNailById = useCallback(async (id: string, name: string, price: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.patchNail({
        id, name, price, accessToken,
      });
      updateNail(id, name, price);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [updateNail, loading, setErrorType, accessToken]);

  return {
    nails, fetchNails, createNail, deleteNailById, updateNail, updateNailById, loading,
  };
};
