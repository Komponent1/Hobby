import React, { useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickerValue } from '@mui/x-date-pickers/internals';
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

  const changeDate = useCallback((date: PickerValue) => {
    const newDate = date.toDate();
    const changedFilter = changeReservationFilter({ date: newDate });
    fetchReservations(changedFilter);
  }, [changeReservationFilter, fetchReservations]);
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
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(reservationFilter.date)}
              onChange={(newValue) => changeDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default DayCalendar;
