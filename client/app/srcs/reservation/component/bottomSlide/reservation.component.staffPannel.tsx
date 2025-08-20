import React from 'react';
import StaffList from '../reservation.component.staffList';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';

const StaffPannel: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div>
      <h2>Staff Panel</h2>
      <StaffList />
      <button
        type="button"
        onClick={() => setModalType(ModalType.AddStaff)}
        className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
      >
        Add Staff
      </button>
    </div>
  );
};

export default StaffPannel;
