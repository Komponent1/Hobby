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
  const { accessToken } = useAuth();
  useInitEffect();

  if (!accessToken || accessToken === '') return null;
  return (
    <div className="bg-primary">
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
