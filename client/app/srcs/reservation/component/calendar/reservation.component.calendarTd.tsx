import React from 'react';
import { CellH, CellW } from '../reservation.component.constant';

const CalendarTd: React.FC = () => (
  <div
    style={{ width: `${CellW}px`, height: `${CellH}px` }}
    className="flex flex-col border-b border-r border-gray-300"
  >
    <div
      style={{ height: `${CellH / 4}px` }}
      className="border-b-2 border-gray-200"
    />
    <div
      style={{ height: `${CellH / 4}px` }}
      className="border-b-2 border-gray-200"
    />
    <div
      style={{ height: `${CellH / 4}px` }}
      className="border-b-2 border-gray-200"
    />
  </div>
);

export default CalendarTd;
