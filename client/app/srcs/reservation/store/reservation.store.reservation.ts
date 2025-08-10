import { create } from 'zustand';
import { Reservation } from '../dto/reservation.dto.reservation';

export enum ReservationFilterType {
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}
export type ReservationFilter = {
  timeType: ReservationFilterType;
  date: Date;
  staffId?: string;
};
type ReservationState = {
  reservations: Reservation[];
  initReservation: (reservations: Reservation[]) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updatedReservation: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  reservationFilter: ReservationFilter;
  setReservationFilter: (filter: Partial<ReservationFilter>) => void;
};
export const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  initReservation: (reservations) => set({ reservations }),
  addReservation: (reservation) => set((state) => ({
    reservations: [...state.reservations, reservation],
  })),
  updateReservation: (id, updatedReservation) => set((state) => ({
    reservations: state.reservations
      .map(
        (reservation) => (reservation.id === id
          ? { ...reservation, ...updatedReservation } : reservation),
      ),
  })),
  deleteReservation: (id) => set((state) => ({
    reservations: state.reservations.filter((reservation) => reservation.id !== id),
  })),
  reservationFilter: {
    timeType: ReservationFilterType.DAY,
    date: new Date(),
    staffId: undefined,
  },
  setReservationFilter: (filter) => set((state) => ({
    reservationFilter: { ...state.reservationFilter, ...filter },
  })),
}));
