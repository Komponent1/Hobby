import { create } from 'zustand';
import { Nail } from '../dto/reservation.dto.nail';

export type NailState = {
  nails: Nail[];
  initNails: (nails: Nail[]) => void;
  addNail: (nail: Nail) => void;
  deleteNail: (id: string) => void;
  updateNail: (id: string, name: string, price: number) => void;
};
export const useNailStore = create<NailState>((set) => ({
  nails: [],
  initNails: (nails: Nail[]) => set({ nails }),
  addNail: (nail: Nail) => set(({ nails }) => ({
    nails: [...nails, { ...nail }],
  })),
  deleteNail: (id: string) => set(({ nails }) => ({
    nails: nails.filter((nail) => nail.id !== id),
  })),
  updateNail: (id: string, name: string, price: number) => set(({ nails }) => ({
    nails: nails.map((nail) => (nail.id === id ? { ...nail, name, price } : nail)),
  })),
}));
