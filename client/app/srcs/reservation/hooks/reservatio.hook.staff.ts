import { useCallback, useState } from 'react';
import * as adminStaffApi from '../api/reservation.api.admin.staff';
import { useStaffStore } from '../store/reservation.store.staff';

export const useStaff = () => {
  const staffs = useStaffStore((state) => state.staffs);
  const initStaff = useStaffStore((state) => state.initStaff);
  const addStaff = useStaffStore((state) => state.addStaff);
  const deleteStaff = useStaffStore((state) => state.deleteStaff);
  const updateStaff = useStaffStore((state) => state.updateStaff);

  const [loading, setLoading] = useState(false);

  const fetchStaffs = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminStaffApi.getStaffs();
      initStaff(data);
    } catch (err) {
      console.error('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStaff = useCallback(async (name: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const staff = await adminStaffApi.postStaff({ name });
      addStaff(staff);
    } catch (err) {
      console.error('Error creating staff:', err);
    } finally {
      setLoading(false);
    }
  }, [addStaff, loading]);
  const deleteStaffById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminStaffApi.deleteStaff(id);
      deleteStaff(id);
    } catch (err) {
      console.error('Error deleting staff:', err);
    } finally {
      setLoading(false);
    }
  }, [deleteStaff, loading]);
  const updateStaffById = useCallback(async (id: string, name: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminStaffApi.patchStaff(id, name);
      updateStaff(id, name);
    } catch (err) {
      console.error('Error updating staff:', err);
    } finally {
      setLoading(false);
    }
  }, [updateStaff, loading]);

  return {
    staffs,
    fetchStaffs,
    createStaff,
    deleteStaffById,
    updateStaffById,
    loading,
  };
};
