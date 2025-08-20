/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { BottomSlideType, useBottomSlide } from '../../store/reservation.store.bottomSlide';
import StaffPannel from './reservation.component.staffPannel';
import NailPannel from './reservation.component.nailPannel';

const BottomSlide: React.FC = () => {
  const bottomSlideType = useBottomSlide((state) => state.bottomSlideType);
  const setBottomSlideType = useBottomSlide((state) => state.setBottomSlideType);

  const handleClose = useCallback(() => {
    setBottomSlideType(BottomSlideType.None);
  }, [setBottomSlideType]);

  if (bottomSlideType === BottomSlideType.None) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-500/50 z-10"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="fixed bottom-0 rounded-t-2xl bg-white p-4 border w-full flex justify-center items-center">
          {bottomSlideType === BottomSlideType.Staff && <StaffPannel />}
          {bottomSlideType === BottomSlideType.Nail && <NailPannel />}
        </div>
      </div>
    </div>
  );
};

export default BottomSlide;
