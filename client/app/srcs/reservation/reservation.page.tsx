import React from 'react';
import { Portal } from '../common/common.components';
import { DropdownMenu, Modal, StaffList } from './component';
import { ModalType, useModalStore } from './store/reservation.store.modal';
import NailList from './component/reservation.component.nailList';
import WeekCalendar from './component/calendar/reservation.component.weekCalendar';

const ReservationPage: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div>
      <StaffList />
      <button
        type="button"
        onClick={() => setModalType(ModalType.AddStaff)}
        className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
      >
        Add Staff
      </button>
      <hr />
      <NailList />
      <button
        type="button"
        onClick={() => setModalType(ModalType.AddNail)}
        className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
      >
        Add Nail
      </button>
      <hr />
      <WeekCalendar />
      <button
        type="button"
        onClick={() => setModalType(ModalType.AddReservation)}
        className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
      >
        Add Reservation
      </button>

      <Portal type="modal-root">
        <Modal />
      </Portal>
      <Portal type="drop-down-root">
        <DropdownMenu />
      </Portal>
    </div>
  );
};

export default ReservationPage;
