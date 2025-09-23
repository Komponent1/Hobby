import React from 'react';
import { Button } from '@mui/material';
import DailyCalendar from '../calendar/reservation.component.dailyCalendar';
import Header from './reservation.component.header';
import { PannelIconMatch, PannelTextMatch, PannelType } from '../reservation.component.enum';
import { Icon, Typography } from '../../../common/common.components';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';

type Props = {
  currentPanel: PannelType;
};
const Pannel: React.FC<Props> = ({ currentPanel }) => {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div className="w-full h-full">
      <Header>
        <div className="flex items-center">
          <Icon name={PannelIconMatch[currentPanel]} size={24} />
          <Typography type="h3" customClass="ml-2">{PannelTextMatch[currentPanel]}</Typography>
          {currentPanel === PannelType.RESERVATION && (
          <Button
            variant="outlined"
            color="primary"
            style={{marginLeft: '1rem'}}
            onClick={() => setModalType(ModalType.AddReservation)}
          >
            새 예약 추가
          </Button>
          )}
        </div>
      </Header>
      {currentPanel === PannelType.RESERVATION && (
      <DailyCalendar />
      )}
    </div>
  );
};

export default Pannel;
