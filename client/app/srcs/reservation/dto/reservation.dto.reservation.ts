import { Nail } from './reservation.dto.nail';
import { Staff } from './reservation.dto.staff';

export type Reservation = {
  id: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  phone: string;
  name: string;
  staff: Staff;
  nail: Nail;
};
