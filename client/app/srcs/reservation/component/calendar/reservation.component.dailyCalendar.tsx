import React from 'react';
import CalendarHeader from './reservation.component.calendarHeader';
import CalendarTh from './reservation.component.calendarTh';
import { useStaffStore } from '../../store/reservation.store.staff';
import CalendarTc from './reservation.component.calendarTc';
import { CellH, FirstW, WorkTime } from '../reservation.component.constant';

const DailyCalendar: React.FC = () => {
  const staffs = useStaffStore((state) => state.staffs);

  return (
    <div className="p-4 rounded-tl-3xl bg-white w-full h-full">
      <CalendarHeader />
      <CalendarTh />
      <div className="flex">
        <div className="flex-col">
          {WorkTime.map((time) => (
            <div
              key={time}
              className="flex pt-4 justify-center border-b border-r border-gray-200 font-bold"
              style={{ width: `${FirstW}px`, height: `${CellH}px` }}
            >
              {`${time}:00`}
            </div>
          ))}
        </div>
        {staffs.map((staff) => (
          <CalendarTc key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default DailyCalendar;
