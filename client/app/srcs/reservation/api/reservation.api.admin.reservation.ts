import { Reservation } from '../dto/reservation.dto.reservation';
import { ReservationFilter } from '../store/reservation.store.reservation';

export const postReservation = async (
  {
    date, phone, name, staffId, nailId,
  }
  : { date: string, phone: string, name: string, staffId: string, nailId: string },
): Promise<void> => {
  try {
    await fetch('/reservation/admin/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date, phone, name, staffId, nailId,
      }),
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};
export const getReservations = async (
  {filter}: {filter: ReservationFilter},
): Promise<Reservation[]> => {
  try {
    let api = '';
    switch (filter.timeType) {
      case 'week':
        api = `/reservation/admin/reservations/week/${filter.date.toISOString()}`;
        break;
      case 'month':
        api = `/reservation/admin/reservations/month/${filter.date.toISOString()}`;
        break;
      case 'day':
        api = `/reservation/admin/reservations/day/${filter.date.toISOString()}`;
        break;
      default:
        api = '/reservation/admin/reservations';
        break;
    }
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      date: new Date(item.date),
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};
