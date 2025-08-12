import { useCallback, useState } from 'react';
import * as adminStaffApi from '../api/reservation.api.admin.staff';
import { useStaffStore } from '../store/reservation.store.staff';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';
import { useAuthStore } from '../store/reservation.store.auth';

export const useStaff = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const staffs = useStaffStore((state) => state.staffs);
  const initStaff = useStaffStore((state) => state.initStaff);
  const addStaff = useStaffStore((state) => state.addStaff);
  const deleteStaff = useStaffStore((state) => state.deleteStaff);
  const updateStaff = useStaffStore((state) => state.updateStaff);
  const setErrorType = useErrorStore((state) => state.setErrorType);

  const [loading, setLoading] = useState(false);

  const fetchStaffs = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminStaffApi.getStaffs({ accessToken });
      initStaff(data);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [initStaff, loading, setErrorType, accessToken]);

  const createStaff = useCallback(async (name: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const staff = await adminStaffApi.postStaff({ name, accessToken });
      addStaff(staff);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [addStaff, loading, setErrorType, accessToken]);
  const deleteStaffById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminStaffApi.deleteStaff({ accessToken, id });
      deleteStaff(id);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [deleteStaff, loading, setErrorType, accessToken]);
  const updateStaffById = useCallback(async (id: string, name: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminStaffApi.patchStaff({
        accessToken, id, name,
      });
      updateStaff(id, name);
    } catch (err) {
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [updateStaff, loading, setErrorType, accessToken]);

  return {
    staffs,
    fetchStaffs,
    createStaff,
    deleteStaffById,
    updateStaffById,
    loading,
  };
};
