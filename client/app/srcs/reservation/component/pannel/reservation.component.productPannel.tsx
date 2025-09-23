import React from 'react';
import { Button } from '@mui/material';
import { PannelIconMatch, PannelTextMatch, PannelType } from '../reservation.component.enum';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';
import Header from './reservation.component.header';
import { Icon, Typography } from '../../../common/common.components';
import ProductList from '../product/reservation.component.productList';

type Props = {
  currentPanel: PannelType;
};
const ProductPannel: React.FC<Props> = ({ currentPanel }) => {
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
            onClick={() => setModalType(ModalType.AddProduct)}
          >
            제품 추가
          </Button>
        </div>
      </Header>
      <ProductList />
    </div>
  );
};

export default ProductPannel;
