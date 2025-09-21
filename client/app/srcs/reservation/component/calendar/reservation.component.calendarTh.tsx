import React from 'react';
import { useStaffStore } from '../../store/reservation.store.staff';
import { Typography } from '../../../common/common.components';
import { FirstW, TopH, CellW } from '../reservation.component.constant';

const CalendarTh: React.FC = () => {
  const staffs = useStaffStore((state) => state.staffs);

  return (
    <div className="flex bg-white border-b border-gray-300">
      <div
        style={{ width: `${FirstW}px`, height: `${TopH}px` }}
        className="border-r border-gray-300 flex justify-center items-center"
      >
        <Typography type="h4">시간</Typography>
      </div>
      {staffs.map((staff) => (
        <div key={staff.id} style={{ width: `${CellW}px`, height: `${TopH}px` }} className="border-r border-gray-300 flex justify-center items-center">
          <div>
            <Typography type="h4">{staff.name}</Typography>
          </div>
          <div>
            {Array.from({ length: 12 }, (_, hour) => (
              <div key={hour} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarTh;
