import React from 'react';
import { Portal } from '../common/common.components';
import { DropdownMenu, Modal } from './component';
import ErrorModal from './component/error/reservation.component.error';
import { useInitEffect } from './hooks/reservation.hook.init';
import { useAuth } from './hooks/reservation.hook.auth';
import Pannel from './component/pannel/reservation.component.pannel';
import BottomTab from './component/reservation.component.bottomTab';
import BottomSlide from './component/bottomSlide/reservation.component.bottomSlide';

const ReservationMainPage: React.FC = () => {
  const { accessToken, logout } = useAuth();
  useInitEffect();

  if (!accessToken || accessToken === '') return null;
  return (
    <div className="bg-amber-100">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Reservation Management</h1>
        <button type="button" onClick={logout} className="mb-4 rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm">
          Logout
        </button>
      </header>
      <main className="mb-24">
        <Pannel />
      </main>
      <BottomTab />
      <Portal type="modal-root">
        <Modal />
      </Portal>
      <Portal type="drop-down-root">
        <DropdownMenu />
      </Portal>
      <Portal type="error-root">
        <ErrorModal />
      </Portal>
      <Portal type="bottom-slide-root">
        <BottomSlide />
      </Portal>
    </div>
  );
};

export default ReservationMainPage;
