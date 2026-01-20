import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/rock-breaker/rock-breaker.container'),
  { ssr: false },
);

const RockBreaker: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default RockBreaker;
