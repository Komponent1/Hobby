import { create } from 'zustand';

export enum DropdownMenuType {
  None = 'NONE',
  controlStaff = 'CONTROL_STAFF',
  controlNail = 'CONTROL_NAIL',
}
type DropdownMenuState = {
  position: { x: number; y: number };
  setPosition: (x: number, y: number) => void;
  dropdownMenuType: DropdownMenuType;
  setDropdownMenuType: (type: DropdownMenuType) => void;
  props: any;
  setProps: (props: any) => void;
};
export const useDropdownMenu = create<DropdownMenuState>((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (x, y) => set({ position: { x, y } }),
  dropdownMenuType: DropdownMenuType.None,
  setDropdownMenuType: (type: DropdownMenuType) => set({ dropdownMenuType: type }),
  props: {},
  setProps: (props) => set({ props }),
}));
