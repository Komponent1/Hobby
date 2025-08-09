import { useCallback, useState } from 'react';
import { useNailStore } from '../store/reservation.store.nail';
import * as adminNailApi from '../api/reservation.api.admin.nail';

export const useNail = () => {
  const nails = useNailStore((state) => state.nails);
  const initNails = useNailStore((state) => state.initNails);
  const addNail = useNailStore((state) => state.addNail);
  const deleteNail = useNailStore((state) => state.deleteNail);
  const updateNail = useNailStore((state) => state.updateNail);

  const [loading, setLoading] = useState(false);

  const fetchNails = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminNailApi.getNails();
      initNails(data);
    } catch (err) {
      console.error('Error fetching nails:', err);
    } finally {
      setLoading(false);
    }
  }, [initNails, loading]);

  const createNail = useCallback(async (name: string, price: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const nail = await adminNailApi.postNail({ name, price });
      addNail(nail);
    } catch (err) {
      console.error('Error creating nail:', err);
    } finally {
      setLoading(false);
    }
  }, [addNail, loading]);

  const deleteNailById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.deleteNail(id);
      deleteNail(id);
    } catch (err) {
      console.error('Error deleting nail:', err);
    } finally {
      setLoading(false);
    }
  }, [deleteNail, loading]);

  const updateNailById = useCallback(async (id: string, name: string, price: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminNailApi.patchNail(id, name, price);
      updateNail(id, name, price);
    } catch (err) {
      console.error('Error updating nail:', err);
    } finally {
      setLoading(false);
    }
  }, [updateNail, loading]);

  return {
    nails, fetchNails, createNail, deleteNailById, updateNail, updateNailById, loading,
  };
};
