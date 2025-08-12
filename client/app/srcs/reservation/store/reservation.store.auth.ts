import {create} from 'zustand';

type AuthState = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({accessToken: token}),
}));
