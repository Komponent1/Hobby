import React from 'react';
import {Typography} from '@seolim/designsystem';
import {SimpleCard} from './main.component.simplecard';

type Props = {
  onLink: (path: string) => void;
};
const UiIntro: React.FC<Props> = ({ onLink }) => (
  <SimpleCard
    icon="my"
    title="SEOLIM UI"
    iconBackground="bg-gray-800"
    description="My personal React component library"
    onLink={() => onLink('/seolim-ui')}
    etc={(
      <div className="flex-col items-start lg:flex relative">
        <Typography element="p" type="secondary" size="xl" weight="bold">
          간결한 react 컴포넌트 라이브러리
        </Typography>
      </div>
      )}
  />
);

export default UiIntro;
