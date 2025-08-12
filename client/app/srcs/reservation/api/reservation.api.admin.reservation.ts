import { Reservation } from '../dto/reservation.dto.reservation';
import { ErrorType } from '../store/reservation.store.error';
import { ReservationFilter } from '../store/reservation.store.reservation';
import { UnAuthorizedException, UnknownException } from '../util/reservation.util.exception';

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
  const response = await fetch('/reservation/admin/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      startTime, endTime, phone, name, staffId, nailId,
    }),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const getReservations = async (
  {accessToken, filter}: {accessToken: string; filter: ReservationFilter},
): Promise<Reservation[]> => {
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
  if (response.ok) {
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      startTime: new Date(item.startTime),
      endTime: new Date(item.endTime),
      createdAt: new Date(item.createdAt),
    }));
  }
  if (response.status === 401) {
    throw new Error(ErrorType.UnAuthorized);
  }
  throw new UnknownException();
};
export const deleteReservation = async (
  {accessToken, reservationId}: {accessToken: string; reservationId: string},
): Promise<void> => {
  const response = await fetch(`/reservation/admin/reservation/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(ErrorType.UnAuthorized);
    }
    throw new UnknownException();
  }
};
export const patchReservation = async (
  {accessToken, reservationId, updateData}
  : {accessToken: string; reservationId: string; updateData: Partial<Reservation>},
): Promise<void> => {
  const response = await fetch(`/reservation/admin/reservation/${reservationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(ErrorType.UnAuthorized);
    }
    throw new UnknownException();
  }
};
