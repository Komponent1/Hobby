/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { Reservation } from '../../dto/reservation.dto.reservation';

const WeekCalendar: React.FC = () => {
  const { reservations, fetchReservations } = useReservation();
  useEffect(() => {
    fetchReservations({});
  }, []);

  const groupedReservations = reservations.reduce((acc, reservation) => {
    const date = new Date(reservation.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(reservation);
    return acc;
  }, {} as Record<string, Reservation[]>);

  return (
    <div>
      {Object.entries(groupedReservations).map(([date, rev]) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {rev.map((reservation) => (
              <li key={reservation.id} className="flex border-2 border-gray-300 p-2 mb-2">
                <div>{reservation.startTime.toDateString()}</div>
                <div>{reservation.name}</div>
                <div>{reservation.nail.name}</div>
                <div>{reservation.staff.name}</div>
                <div>{reservation.phone}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeekCalendar;
