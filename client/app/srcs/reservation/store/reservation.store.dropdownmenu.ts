import { create } from 'zustand';

export enum DropdownMenuType {
  None = 'NONE',
  controlStaff = 'CONTROL_STAFF',
  controlProduct = 'CONTROL_PRODUCT',
  controlReservation = 'CONTROL_RESERVATION',
  dateChanger = 'DATE_CHANGER',
}
type DropdownMenuState = {
  position: { x: number; y: number };
  dropdownMenuType: DropdownMenuType;
  setDropdownMenuType: (
    type: DropdownMenuType, position?: { x: number; y: number }, props?: any,
  ) => void;
  props: any;
  setProps: (props: any) => void;
};
export const useDropdownMenu = create<DropdownMenuState>((set) => ({
  position: { x: 0, y: 0 },
  dropdownMenuType: DropdownMenuType.None,
  setDropdownMenuType: (
    type: DropdownMenuType,
    position?: { x: number; y: number },
    props?: any,
  ) => set(
    { dropdownMenuType: type, position, props },
  ),
  props: {},
  setProps: (props) => set({ props }),
}));
