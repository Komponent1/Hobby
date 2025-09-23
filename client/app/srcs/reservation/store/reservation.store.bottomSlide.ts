import { create } from 'zustand';

export enum BottomSlideType {
  None = 'NONE',
  Staff = 'STAFF',
  Product = 'PRODUCT',
}
type BottomSlideState = {
  bottomSlideType: BottomSlideType;
  setBottomSlideType: (type: BottomSlideType, props?: any) => void;
  props: any;
};
export const useBottomSlide = create<BottomSlideState>((set) => ({
  bottomSlideType: BottomSlideType.None,
  setBottomSlideType: (type: BottomSlideType, props: any) => set({ bottomSlideType: type, props }),
  props: {},
}));
