import React from 'react';
import { Reservation } from '../../dto/reservation.dto.reservation';
import { Staff } from '../../dto/reservation.dto.staff';

const LAYOUT = {
  topH: 48,
  cellH: 96,
  firstW: 48,
  cellW: 144,
};
type Props = {
  date: Date;
  reservations: Reservation[];
  staffs: Staff[];
  onClickCell: (e: React.MouseEvent, reservation: Reservation) => void;
};
const DailyCalendar: React.FC<Props> = ({
  date, reservations, staffs, onClickCell,
}) => (
  <div className="p-4 rounded-tl-3xl bg-white w-full">
    <div>
      <h1>{date.toLocaleDateString('kor')}</h1>
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

export default DailyCalendar;
