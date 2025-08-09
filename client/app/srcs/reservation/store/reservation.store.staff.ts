import { create } from 'zustand';
import { Staff } from '../dto/reservation.dto.staff';

type StaffState = {
  staffs: Staff[];
  initStaff: (staffs: Staff[]) => void;
  addStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;
  updateStaff: (id: string, name: string) => void;
};
export const useStaffStore = create<StaffState>((set) => ({
  staffs: [],
  initStaff: (staffs: Staff[]) => set({ staffs }),
  addStaff: (staff: Staff) => set(({ staffs }) => ({
    staffs: [...staffs, { ...staff }],
  })),
  deleteStaff: (id: string) => set(({ staffs }) => ({
    staffs: staffs.filter((staff) => staff.id !== id),
  })),
  updateStaff: (id: string, name: string) => set(({ staffs }) => ({
    staffs: staffs.map((staff) => (staff.id === id ? { ...staff, name } : staff)),
  })),
}));
