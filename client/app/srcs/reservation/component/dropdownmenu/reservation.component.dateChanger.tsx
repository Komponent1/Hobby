import React, { useCallback } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { useReservation } from '../../hooks/reservation.hook.reservation';

const DateChanger: React.FC = () => {
  const { reservationFilter, changeReservationFilter, fetchReservations } = useReservation();

  const changeDate = useCallback((date: PickerValue) => {
    const newDate = (date as Dayjs).toDate();
    const changedFilter = changeReservationFilter({ date: newDate });
    fetchReservations({filter: changedFilter});
  }, [changeReservationFilter, fetchReservations]);

  return (
    <div className="bg-white rounded-3xl pt-4 pb-4 shadow-lg w-96">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs(reservationFilter.date)}
          onChange={(newValue) => changeDate(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateChanger;
