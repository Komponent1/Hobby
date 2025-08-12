/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useStaffStore } from '../../store/reservation.store.staff';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { Reservation } from '../../dto/reservation.dto.reservation';

const LAYOUT = {
  topH: 48,
  cellH: 96,
  firstW: 48,
  cellW: 144,
};
const DayCalendar: React.FC = () => {
  const {
    reservations, changeReservationFilter, fetchReservations, reservationFilter,
  } = useReservation();
  const staffs = useStaffStore((state) => state.staffs);
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  const changeDate = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(reservationFilter.date);
    newDate.setDate(newDate.getDate() + (direction === 'prev' ? -1 : 1));
    const changedFilter = changeReservationFilter({ date: newDate });
    fetchReservations(changedFilter);
  }, [changeReservationFilter, reservationFilter.date, fetchReservations]);
  const onClickCell = useCallback((e: React.MouseEvent, reservation: Reservation) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlReservation,
      { x: e.clientX, y: e.clientY },
      { reservation },
    );
  }, [setDropdownMenuType]);

  return (
    <div className="mb-4">
      <div className="flex">
        <button type="button" onClick={() => changeDate('prev')}>
          Previous Day
        </button>
        <h2>{reservationFilter.date.toLocaleDateString('ko-KR')}</h2>
        <button type="button" onClick={() => changeDate('next')}>
          Next Day
        </button>
      </div>
      <div className="flex border-b border-l border-gray-300">
        <div>
          <div
            className="border-t border-r border-gray-300"
            style={{ height: `${LAYOUT.topH}px`, width: `${LAYOUT.firstW}px` }}
          >
            <h2>시간</h2>
          </div>
          {Array.from({ length: 12 }, (_, hour) => (
            <div key={hour} className="border-t border-r border-gray-300" style={{ height: `${LAYOUT.cellH}px`, width: `${LAYOUT.firstW}px` }}>
              <p>
                {`${hour + 11}:00`}
              </p>
            </div>
          ))}
        </div>
        {staffs.map((staff) => (
          <div key={staff.id}>
            <div className="border-t border-r border-gray-300" style={{ height: `${LAYOUT.topH}px`, width: `${LAYOUT.cellW}px` }}>
              <h3>{staff.name}</h3>
            </div>
            <div className="relative">
              {Array.from({ length: 12 }, (_, hour) => (
                <div key={hour} className="border-t border-r border-gray-300" style={{ height: `${LAYOUT.cellH}px`, width: `${LAYOUT.cellW}px` }} />
              ))}
              {reservations
                .filter((reservation) => reservation.staff.id === staff.id)
                .map((reservation) => (
                  <button
                    type="button"
                    key={reservation.id}
                    className="bg-amber-600 absolute"
                    style={{
                      top: `${(reservation.startTime.getHours() - 11 + reservation.startTime.getMinutes() / 60) * LAYOUT.cellH}px`,
                      height: `${((reservation.endTime.getTime() - reservation.startTime.getTime()) / 1000 / 60 / 60) * LAYOUT.cellH}px`,
                      width: `${LAYOUT.cellW}px`,
                    }}
                    onClick={(e) => onClickCell(e, reservation)}
                  >
                    <h4>{reservation.name}</h4>
                    <p>{reservation.nail.name}</p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCalendar;
