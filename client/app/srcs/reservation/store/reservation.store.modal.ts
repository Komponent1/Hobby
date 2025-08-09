import { create } from 'zustand';

export enum ModalType {
  None = 'NONE',
  AddStaff = 'ADD_STAFF',
  AddNail = 'ADD_NAIL',
  AddReservation = 'ADD_RESERVATION',
}
type ModalState = {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  props: any;
};
export const useModalStore = create<ModalState>((set) => ({
  modalType: ModalType.None,
  setModalType: (type: ModalType) => set({ modalType: type }),
  props: {},
}));
