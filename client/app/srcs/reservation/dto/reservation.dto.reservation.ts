import { Product } from './reservation.dto.product';
import { Staff } from './reservation.dto.staff';

export type Reservation = {
  id: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  phone: string;
  name: string;
  staff: Staff;
  product: Product;
};
