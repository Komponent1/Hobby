/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Icon, Typography } from '../../../common/common.components';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { ReservationFilter } from '../../store/reservation.store.reservation';

type Props = {

};
const CalendarHeader: React.FC<Props> = () => {
  const { reservationFilter, changeReservationFilter, fetchReservations } = useReservation();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  const changeDate = useCallback((type: 'next' | 'prev' | 'today') => {
    let changedFilter: ReservationFilter;
    const currentDate = reservationFilter.date;
    switch (type) {
      case 'today':
        changedFilter = changeReservationFilter({ date: new Date() });
        break;
      case 'next':
        changedFilter = changeReservationFilter(
          { date: new Date(currentDate.setDate(currentDate.getDate() + 1)) },
        );
        break;
      case 'prev':
        changedFilter = changeReservationFilter(
          { date: new Date(currentDate.setDate(currentDate.getDate() - 1)) },
        );
        break;
      default:
        return;
    }
    fetchReservations({ filter: changedFilter });
  }, [changeReservationFilter, fetchReservations, reservationFilter]);

  /** TODO: 레이아웃 정렬 필요 */
  return (
    <div className="border-gray-300 border-b-2 border-t-2 p-4 flex justify-between items-center">
      <Button variant="outlined" onClick={() => changeDate('today')}>Today</Button>
      <div className="flex items-center gap-8">
        <Icon name="chevron_left" size={18} onClick={() => changeDate('prev')} color="gray" />
        <div
          onClick={(e: React.MouseEvent) => setDropdownMenuType(DropdownMenuType.dateChanger, {
            x: e.currentTarget.getBoundingClientRect().left,
            y: e.currentTarget.getBoundingClientRect().bottom,
          })}
          className="cursor-pointer"
        >
          <Typography type="h4">{reservationFilter.date.toLocaleDateString('kor')}</Typography>
        </div>
        <Icon name="chevron_right" size={18} onClick={() => changeDate('next')} color="gray" />
      </div>
      <div />
    </div>
  );
};

export default CalendarHeader;
