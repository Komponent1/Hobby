import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/survival-skull/survival-skull.container'),
  { ssr: false },
);

const SurvivalSkull: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default SurvivalSkull;
