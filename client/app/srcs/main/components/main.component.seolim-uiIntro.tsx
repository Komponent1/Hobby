import React from 'react';
import {SimpleCard} from './main.component.simplecard';

type Props = {
  onLink: (path: string) => void;
};
const UiIntro: React.FC<Props> = ({ onLink }) => (
  <SimpleCard
    icon="file_earmark_fill"
    title="SEOLIM UI"
    description="My personal React component library"
    onLink={() => onLink('/seolim-ui')}
    etc={(
      <div className="flex-col items-start lg:flex relative">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          SEOLIM UI에 오신 것을 환영합니다!
        </h2>
      </div>
      )}
  />
);

export default UiIntro;
