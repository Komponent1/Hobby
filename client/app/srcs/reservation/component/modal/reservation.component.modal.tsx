/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';
import AddStaff from './reservation.component.addStaff';
import AddNail from './reservation.component.addNail';
import AddReservation from './reservation.component.addReservation';

const Modal: React.FC = () => {
  const modalType = useModalStore((state) => state.modalType);
  const setModalType = useModalStore((state) => state.setModalType);
  const [backgroundStyle, setBackgroundStyle] = useState('');

  useEffect(() => {
    switch (modalType) {
      case ModalType.AddStaff:
        setBackgroundStyle('bg-gray-500 opacity-50 flex items-center justify-center');
        break;
      case ModalType.AddNail:
        setBackgroundStyle('bg-gray-500 opacity-50 flex items-center justify-center');
        break;
      case ModalType.AddReservation:
        setBackgroundStyle('bg-gray-500 opacity-50 flex items-center justify-center');
        break;
      case ModalType.None:
      default:
        setBackgroundStyle('');
        break;
    }
  }, [modalType]);
  const handleClose = useCallback(() => {
    setModalType(ModalType.None);
  }, [setModalType]);

  if (modalType === ModalType.None) return null;
  return (
    <button
      type="button"
      className={`absolute top-0 left-0 w-screen h-screen ${backgroundStyle}`}
      onClick={handleClose}
    >
      <div className="opacity-100" onClick={(e) => e.stopPropagation()}>
        {modalType === ModalType.AddStaff && <AddStaff />}
        {modalType === ModalType.AddNail && <AddNail />}
        {modalType === ModalType.AddReservation && <AddReservation />}
      </div>
    </button>
  );
};

export default Modal;
