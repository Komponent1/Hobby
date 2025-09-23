import React from 'react';
import { Button } from '@mui/material';
import Header from './reservation.component.header';
import { Icon, Typography } from '../../../common/common.components';
import DailyCalendar from '../calendar/reservation.component.dailyCalendar';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';
import { PannelIconMatch, PannelTextMatch, PannelType } from '../reservation.component.enum';

type Props = {
  currentPanel: PannelType;
};
const ReservationPannel: React.FC<Props> = ({ currentPanel }) => {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div>
      <Header>
        <div className="flex items-center">
          <Icon name={PannelIconMatch[currentPanel]} size={24} />
          <Typography type="h3" customClass="ml-2">{PannelTextMatch[currentPanel]}</Typography>
          <Button
            variant="outlined"
            color="primary"
            style={{marginLeft: '1rem'}}
            onClick={() => setModalType(ModalType.AddReservation)}
          >
            새 예약 추가
          </Button>
        </div>
      </Header>
      <DailyCalendar />
    </div>
  );
};

export default ReservationPannel;
