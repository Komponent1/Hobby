import React, { useMemo } from 'react';
import { Staff } from '../../dto/reservation.dto.staff';
import { useReservationStore } from '../../store/reservation.store.reservation';
import CalendarTd from './reservation.component.calendarTd';
import ReservationBox from './reservation.component.reservationBox';
import { WorkTime } from '../reservation.component.constant';

type Props = {
  staff: Staff;
};
const CalendarTc: React.FC<Props> = ({ staff }) => {
  const reservations = useReservationStore((state) => state.reservations);
  const targetReservations = useMemo(
    () => reservations.filter((res) => res.staff.id === staff.id),
    [reservations, staff],
  );

  return (
    <div className="relative">
      {WorkTime.map((time) => (
        <CalendarTd key={`staff.id_${time}`} />
      ))}
      {targetReservations.map((res) => (
        <ReservationBox key={res.id} reservation={res} />
      ))}
    </div>
  );
};

export default CalendarTc;
