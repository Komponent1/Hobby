import { Reservation } from '../dto/reservation.dto.reservation';
import { ErrorType } from '../store/reservation.store.error';
import { ReservationFilter } from '../store/reservation.store.reservation';

export const postReservation = async (
  {
    accessToken, startTime, endTime, phone, name, staffId, nailId,
  }
  : {
    accessToken: string;
    startTime: string,
    endTime: string;
    phone: string,
    name: string,
    staffId: string,
    nailId: string,
  },
): Promise<void> => {
  try {
    await fetch('/reservation/admin/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        startTime, endTime, phone, name, staffId, nailId,
      }),
    });
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const getReservations = async (
  {accessToken, filter}: {accessToken: string; filter: ReservationFilter},
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
        api = `/reservation/admin/reservations/date/${filter.date.toISOString()}`;
        break;
      default:
        api = '/reservation/admin/reservations';
        break;
    }
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      startTime: new Date(item.startTime),
      endTime: new Date(item.endTime),
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const deleteReservation = async (
  {accessToken, reservationId}: {accessToken: string; reservationId: string},
): Promise<void> => {
  try {
    await fetch(`/reservation/admin/reservation/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const patchReservation = async (
  {accessToken, reservationId, updateData}
  : {accessToken: string; reservationId: string; updateData: Partial<Reservation>},
): Promise<void> => {
  try {
    await fetch(`/reservation/admin/reservation/${reservationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
