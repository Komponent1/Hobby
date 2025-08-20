import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { ReservationFilter } from '../../store/reservation.store.reservation';

type Props = {
  changeDate: (date: PickerValue) => void;
  reservationFilter: ReservationFilter;
};
const Sider: React.FC<Props> = ({ changeDate, reservationFilter }) => (
  <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs(reservationFilter.date)}
        onChange={(newValue) => changeDate(newValue)}
      />
    </LocalizationProvider>
  </div>
);

export default Sider;
