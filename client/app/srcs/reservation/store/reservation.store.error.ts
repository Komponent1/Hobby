import { create } from 'zustand';

export enum ErrorType {
  None = 'NONE',
  Unknown = 'UNKNOWN',
}
type ErrorState = {
  errorType: ErrorType;
  setErrorType: (type: ErrorType, props?: any) => void;
  props: any;
};
export const useErrorStore = create<ErrorState>((set) => ({
  errorType: ErrorType.None,
  setErrorType: (type: ErrorType, props: any) => set({ errorType: type, props }),
  props: {},
}));
