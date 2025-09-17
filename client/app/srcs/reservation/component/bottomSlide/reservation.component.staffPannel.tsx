import React from 'react';
import StaffList from '../reservation.component.staffList';

const StaffPannel: React.FC = () => (
  <div>
    <h2 className="font-bold mb-4">직원 관리</h2>
    <StaffList />
  </div>
);

export default StaffPannel;
