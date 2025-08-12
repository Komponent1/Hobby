import React from 'react';
import { Portal } from '../common/common.components';
import { DropdownMenu, Modal, StaffList } from './component';
import { ModalType, useModalStore } from './store/reservation.store.modal';
import NailList from './component/reservation.component.nailList';
import ErrorModal from './component/error/reservation.component.error';
import DayCalendar from './component/calendar/reservation.component.dayCalendar';
import { useInitEffect } from './hooks/reservation.hook.init';
import { useAuth } from './hooks/reservation.hook.auth';

const ReservationMainPage: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const { accessToken, logout } = useAuth();
  useInitEffect();

  if (!accessToken || accessToken === '') return null;
  return (
    <div>
      <header>
        <h1 className="text-lg font-bold">Reservation Management</h1>
      </header>
      <main>
        <DayCalendar />
      </main>
      <button type="button" onClick={logout} className="mb-4 rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm">
        Logout
      </button>
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
      <Portal type="error-root">
        <ErrorModal />
      </Portal>
    </div>
  );
};

export default ReservationMainPage;
