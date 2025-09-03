import React, { useCallback } from 'react';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { useStaff } from '../../hooks/reservatio.hook.staff';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import Sider from './reservation.component.sider';
import { Reservation } from '../../dto/reservation.dto.reservation';
import DailyCalendar from './reservation.component.dailyCalendar';
import { useAuth } from '../../hooks/reservation.hook.auth';

const Pannel: React.FC = () => {
  const {
    reservations, changeReservationFilter, fetchReservations, reservationFilter,
  } = useReservation();

  const { staffs } = useStaff();

  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  const { logout } = useAuth();

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
    <div className="flex pt-4 pb-4 pl-4">
      <div className="flex-col text-center mr-4">
        <h1 className="text-2xl font-bold text-white mb-4">예약 관리</h1>
        <Sider
          changeDate={changeDate}
          reservationFilter={reservationFilter}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-end mb-4 mr-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            LOGOUT
          </Button>
        </div>
        <DailyCalendar
          date={reservationFilter.date}
          reservations={reservations}
          staffs={staffs}
          onClickCell={onClickCell}
        />
      </div>
    </div>
  );
};

export default Pannel;
