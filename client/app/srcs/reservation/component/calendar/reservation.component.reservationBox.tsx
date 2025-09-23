import React from 'react';
import { Reservation } from '../../dto/reservation.dto.reservation';
import { Typography } from '../../../common/common.components';
import { CellH } from '../reservation.component.constant';

const calStartPosision = (startTime: Date) => {
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();
  return (startHour * 60 + startMinute - 11 * 60) * (CellH / 60);
};
const calBoxHeight = (startTime: Date, endTime: Date) => {
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();
  const endHour = endTime.getHours();
  const endMinute = endTime.getMinutes();
  return ((endHour - startHour) * 60 + (endMinute - startMinute)) * (CellH / 60);
};
const getTimeString = (time: Date) => {
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minute}`;
};
type Props = {
  reservation: Reservation;
};
const ReservationBox: React.FC<Props> = ({reservation}) => (
  <div
    className="absolute bg-fuchsia-200 p-2 rounded-md shadow-sm"
    style={{
      top: `${calStartPosision(reservation.startTime)}px`,
      height: `${calBoxHeight(reservation.startTime, reservation.endTime)}px`,
      width: 'calc(100% - 8px)',
      left: '4px',
    }}
  >
    <h3 className="font-bold">{reservation.name}</h3>
    <p>{reservation.product.name}</p>
    <Typography type="tiny" color="gray">
      {`${getTimeString(reservation.startTime)} > ${getTimeString(reservation.endTime)}`}
    </Typography>
  </div>
);

export default ReservationBox;
