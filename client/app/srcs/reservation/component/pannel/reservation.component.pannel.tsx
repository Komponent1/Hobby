import React from 'react';
import DailyCalendar from '../calendar/reservation.component.dailyCalendar';
import Header from './reservation.component.header';
import { PannelType } from '../reservation.component.enum';

type Props = {
  currentPanel: PannelType;
};
const Pannel: React.FC<Props> = ({ currentPanel }) => (
  <div className="w-full h-full">
    <Header title="예약관리" />
    {currentPanel === PannelType.RESERVATION && (
    <DailyCalendar />
    )}
  </div>
);

export default Pannel;
