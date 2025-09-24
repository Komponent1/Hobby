import React from 'react';
import { useStaff } from '../../../hooks/reservatio.hook.staff';
import StaffTh from './reservation.component.staffTh';
import StaffTr from './reservation.component.staffTr';

const StaffTable: React.FC = () => {
  const {staffs} = useStaff();

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-2">
      <table className="w-full">
        <StaffTh />
        <tbody>
          {staffs.map((staff, i) => (
            <StaffTr key={staff.id} staff={staff} odd={i % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
