import React, { useCallback } from 'react';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { Dayjs } from 'dayjs';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { useStaff } from '../../hooks/reservatio.hook.staff';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import Sider from './reservation.component.sider';
import { Reservation } from '../../dto/reservation.dto.reservation';
import DailyCalendar from './reservation.component.dailyCalendar';

const Pannel: React.FC = () => {
  const {
    reservations, changeReservationFilter, fetchReservations, reservationFilter,
  } = useReservation();
  const { staffs } = useStaff();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const changeDate = useCallback((date: PickerValue) => {
    const newDate = (date as Dayjs).toDate();
    const changedFilter = changeReservationFilter({ date: newDate });
    fetchReservations({filter: changedFilter});
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
    <div className="flex">
      <Sider
        changeDate={changeDate}
        reservationFilter={reservationFilter}
      />
      <DailyCalendar
        date={reservationFilter.date}
        reservations={reservations}
        staffs={staffs}
        onClickCell={onClickCell}
      />
    </div>
  );
};

export default Pannel;
